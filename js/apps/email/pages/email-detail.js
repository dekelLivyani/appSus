import { emailService } from "../services/email-service.js";
import emailCompose from '../cmps/email-compose.js'

export default {
    template: `
    <section class="email-details">
       <div class="header">
       <h2 class="subject">{{email.subject}} </h2>
       <div class="buttons-icon" :class="classToButtons">
       <button class="star-btn icon" :class="classToStared" @click.stop="toggleStar" :title="titleStar"></button>
       <button class="edit-btn icon" v-if="email.isDraft" @click="editEmail" title="Edit"></button>
          <button class="remove-btn icon" @click="removeEmail(email.id)" title="Delete"></button>
          <button class="back-btn icon" @click="goBack" title="Back"></button>
      </div>
      </div>
      <div class="details">
         <div class="from">By {{email.from}}</div>
         <div class="to"> To {{email.to}}</div>
         <div class="sent-at">
            <span> {{formatDate.date}}</span>
            <span> {{formatDate.time}}</span>
         </div> 
      </div>
         <div class="body">{{email.body}}</div> 
      <email-compose v-if="isEdit" @addEmail="updateEmail" />
   </section>
`,
    data() {
        return {
            email: {},
            isEdit: false
        }
    },
    components: {
        emailCompose,
    },
    watch: {
        '$route.params.emailId': {
            immediate: true,
            handler() {
                const { emailId } = this.$route.params;
                emailService.getById(emailId)
                    .then(email => this.email = email);
            },
        }
    },
    methods: {
        removeEmail(emailId) {
            emailService.removeEmail(emailId);
            this.$router.push('/email');
        },
        editEmail() {
            this.isEdit = true;
        },
        updateEmail(emailToUpdate) {
            emailService.updateEmail(emailToUpdate)
                .then(email => {
                    this.isEdit = false;
                    this.email = email;

                })
        },
        toggleStar() {
            this.email.isStar = !this.email.isStar;
        },
        goBack() {
            this.$router.push('/email')
        }
    },
    computed: {
        classToButtons() {
            return { 'is-stared': this.email.isStar }
        },
        formatDate() {
            var fullDate = new Date(this.email.sentAt);
            return {
                date: (fullDate.getDate() + '').padStart(2, '0') + '/' +
                    ((fullDate.getMonth() + 1) + '').padStart(2, '0') + '/' +
                    (fullDate.getFullYear() + '').padStart(2, '0'),
                time: (fullDate.getHours() + '').padStart(2, '0') + ':' +
                    (fullDate.getMinutes() + '').padStart(2, '0')
            };
        },
        titleStar() {
            return (this.email.isStar) ? 'Started' : 'Not Started';
        },
        classToStared() {
            return { 'stared': this.email.isStar }
        }
    }
}