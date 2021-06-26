import { emailService } from "../services/email-service.js";
import { eventBus } from "../../../services/event-bus-service.js";
import emailCompose from '../cmps/email-compose.js'

export default {
    template: `
    <section class="email-details" v-if="email">
       <div class="header">
       <h2 class="subject">{{email.subject}} </h2>
       <div class="buttons-icon" :class="classToButtons">
       <button class="replay-btn icon" @click.stop="replayEmail" title="Replay"></button>
       <button class="star-btn icon" :class="classStared" @click.stop="toggleStar" :title="titleStar"></button>
       <button class="edit-btn icon" v-if="email.isDraft" @click="editEmail" title="Edit"></button>
          <button class="remove-btn icon" @click="removeEmail(email.id)" title="Remove"></button>
          <button class="back-btn icon" @click="goBack" title="Back"></button>
      </div>
      </div>
      <div class="details" >
         <div class="from" >By {{email.from.name}}
            <span class="email" v-if="email.from.email"> <{{email.from.email}}> </span>
         </div> 
         <div class="to"> To {{email.to}}</div>
         <div class="sent-at">
            <span> {{formatDate.date}}</span>
            <span> {{formatDate.time}}</span>
         </div> 
      </div>
         <div class="body">{{email.body}}</div> 
      <email-compose class="compose-email" @addEmail="updateEmail" 
      :class="{'is-open' : isEdit}" @closeCompose="isEdit = false"/>
      <email-compose class="compose-email" :emailToReplay="email" 
      :class="{'is-open' : isReplay}"  @addEmail="addEmail" @closeCompose="isReplay = false"/>
      
   </section>
`,
    data() {
        return {
            email: null,
            isEdit: false,
            isReplay: false
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
        },
        replayEmail() {
            this.isReplay = true;
        },
        addEmail(newEmail) {
            emailService.addEmail(newEmail)
                .then(() => {
                    const txt = (newEmail.isDraft) ? 'Your email save in Drafts!' : 'Your email send!'
                    const msg = {
                        txt,
                        type: 'success'
                    }
                    eventBus.$emit('show-msg', msg);
                })
                .catch(err => {
                    const msg = {
                        txt: 'Error, please try again later',
                        type: 'error'
                    }
                    eventBus.$emit('show-msg', msg);
                })
        },
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
        classStared() {
            return { 'stared': this.email.isStar }
        }
    }
}