import { emailService } from "../services/email-service.js";
import emailCompose from '../cmps/email-compose.js'

export default {
    template: `
    <section class="email-details">
      <div class="details">
         <h2>Email-details </h2>
         <div>{{email.subject}} </div>
         <div>{{email.to}}</div>
         <div>{{email.body}}</div>
         <div class="sent-at">
            <span> {{formatDate.date}}</span>
            <span> {{formatDate.time}}</span>
         </div>
         <button class="edit-btn icon" v-if="email.isDraft" @click="editEmail">✎</button>
         <button class="remove-btn icon" @click="removeEmail(email.id)" title="delete">🗑</button>
   </div>
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
            this.isComposeEmail = false;
            emailService.updateEmail(emailToUpdate)
                .then(email => {
                    this.isEdit = false;
                    this.email = email;

                })
        },
    },
    computed: {
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
    }
}