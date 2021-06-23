import emailList from '../cmps/email-list.js'
import emailCompose from '../cmps/email-compose.js'
import { emailService } from '../services/email-service.js'

export default {
    template: `
     <section class="email-app">
     <email-list :emails="emailsToShow"/>
     <button @click="composeEmail">Add Compose</button>
     <email-compose  v-if="isComposeEmail" @addEmail="addEmail"/>   
 </section>
 `,
    data() {
        return {
            emails: null,
            isComposeEmail: false,
        }
    },
    components: {
        emailList,
        emailCompose
    },
    created() {
        this.renderEmails();

    },
    methods: {
        renderEmails() {
            emailService.query()
                .then(emails => this.emails = emails)
        },
        composeEmail() {
            this.isComposeEmail = true;
        },
        addEmail(newEmail) {
            this.isComposeEmail = false;
            emailService.addEmail(newEmail)
                .then(email => {
                    this.renderEmails();
                })
        }
    },
    computed: {
        emailsToShow() {
            return this.emails;
        }
    }
}