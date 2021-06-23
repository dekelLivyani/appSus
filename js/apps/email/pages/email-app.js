import emailList from '../cmps/email-list.js'
import emailCompose from '../cmps/email-compose.js'
import { emailService } from '../services/email-service.js'
import { eventBus } from '../../../services/event-bus-service.js'

export default {
    template: `
     <section class="email-app">
      <div class="filter-email">
         <button @click="setList('Inbox')">Inbox</button>
         <button @click="setList('Stars')">Stars</button>
         <button @click="setList('Drafts')">Drafts</button>
         <button @click="composeEmail">Add Compose</button>
      </div>
     <email-list :emails="emailsToShow"/>
     <email-compose  v-if="isComposeEmail" @closeCompose="isComposeEmail = false" @addEmail="addEmail"/>   
 </section>
 `,
    data() {
        return {
            emails: null,
            isComposeEmail: false,
            listOf: 'Inbox',
        }
    },
    components: {
        emailList,
        emailCompose
    },
    created() {
        this.renderEmails();
        eventBus.$on('removeEmail', this.removeEmail);
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
        },
        removeEmail(emailId) {
            emailService.removeEmail(emailId)
                .then(() => this.renderEmails())
        },
        setList(list) {
            this.listOf = list;
        }
    },
    computed: {
        emailsToShow() {
            if (this.emails) {
                switch (this.listOf) {
                    case 'Inbox':
                        return (this.emails).filter(email => !email.isDraft);
                    case 'Stars':
                        return (this.emails).filter(email => email.isStar);
                    case 'Drafts':
                        return (this.emails).filter(email => email.isDraft);

                }
                return (this.emails).filter(email => !email.isDraft);
            }
        }
    }
}