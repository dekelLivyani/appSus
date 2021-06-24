import emailList from '../cmps/email-list.js'
import emailCompose from '../cmps/email-compose.js'
import { emailService } from '../services/email-service.js'
import { eventBus } from '../../../services/event-bus-service.js'

export default {
    template: `
     <section class="email-app">
        <div class="header-email-app">
          <div class="logo"> Logo </div>

          <div class="info-place">
            <div class="search"> Search </div>
            <div class="sort"> Sort By
             <select v-model="sortBy" class="sort-select" @change="sortEmails">
               <option value="Date">Date</option>
               <option value="Subject">Subject</option>
               <option value="UnRead">UnRead</option>
            </select>
            </div>
            <div> 
             <p class="unread">
             <button class="read-btn icon" @click="toggleUnReadTop">✉</button>
             <span>{{unReadCount}}</span> </p> 
          </div>
         </div>

        </div>

        <div class="body-email-app">
      <div class="filter-email">
         <button @click="setList('Inbox')">Inbox</button>
         <button @click="setList('Stars')">Stars</button>
         <button @click="setList('Drafts')">Drafts</button>
         <button @click="composeEmail">Add Compose</button>
      </div>
     <email-list v-if="!isUnReadTop" :emails="emailsToShow"/>
     <email-list v-else :emails="setEmailsByFilter"/>
     </div>
     <email-compose  v-if="isComposeEmail" @closeCompose="isComposeEmail = false" @addEmail="addEmail"/>   
 </section>
 `,
    data() {
        return {
            emails: null,
            isComposeEmail: false,
            listOf: 'Inbox',
            isUnReadTop: false,
            sortBy: 'Date'
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
        },
        toggleUnReadTop() {
            this.isUnReadTop = !this.isUnReadTop;
        },
        sortEmails() {
            switch (this.sortBy) {
                case 'Date':
                    this.emails.sort((email1, email2) => {
                        return email2.sentAt - email1.sentAt;
                    })
                    break;
                case 'Subject':
                    this.emails.sort((email1, email2) => {
                        const email1Subject = email1.subject.toUpperCase();
                        const email2Subject = email2.subject.toUpperCase();
                        if (email1Subject < email2Subject) return -1;
                        else if (email1Subject > email2Subject) return 1;
                        return 0;
                    })
                    break;
                case 'UnRead':
                    this.emails.sort((email1, email2) => {
                        if (email2.isRead && !email1.isRead) return -1
                        else return 1;
                    })
                    break;
            }
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
        },
        setEmailsByFilter() {
            return this.emailsToShow.filter(email => !email.isRead)
        },
        unReadCount() {
            if (!this.emails) return;
            return this.emails.reduce((acc, email) => {
                if (!email.isRead) acc++;
                return acc;
            }, 0)
        },
    }
}