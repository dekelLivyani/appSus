import emailList from '../cmps/email-list.js'
import emailCompose from '../cmps/email-compose.js'
import emailSearch from '../cmps/email.search.js'
import emailSort from '../cmps/email-sort.js'
import { emailService } from '../services/email-service.js'
import { UserService } from '../services/User-Service.js'
import { eventBus } from '../../../services/event-bus-service.js'

export default {
    template: `
     <section class="email-app">
        <div class="header-email-app">
             <img src="/img/logos/email-logo.png"/>      
          <div class="info-place">
            <email-search :emails="emails" @EmailsAfterSearch="EmailsAfterSearch"/>
            <email-sort :emails="emails"/>
            <div> 
             <p class="unread">
             <button class="read-btn icon" @click="toggleUnReadTop"></button>
             <span>{{unReadCount}}</span> </p> 
          </div>
         </div>

        </div>

        <div class="body-email-app">
      <div class="filter-email">
         <button class="inbox" :class="isActiveInbox" @click="setList('Inbox')"> Inbox</button>
         <button class="stars" :class="isActiveStars" @click="setList('Stars')"> Stars</button>
         <button class="drafts" :class="isActiveDrafts" @click="setList('Drafts')"> Drafts</button>
         <button class="sent" :class="isActiveSent" @click="setList('Sent')"> Sent</button>
         <button class="add-compose" @click="composeEmail"> Compose</button>
      </div>
     <email-list v-if="!isUnReadTop" :emails="emailsToShow"/>
     <email-list v-else :emails="EmailsUnReadShow"/>
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
            user: null,
            emailsSearches: null

        }
    },
    components: {
        emailList,
        emailCompose,
        emailSearch,
        emailSort
    },
    created() {
        this.renderEmails();
        eventBus.$on('removeEmail', this.removeEmail);
        UserService.query()
            .then(user => this.user = user[0])
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
        EmailsAfterSearch(emailsToShow) {
            this.emailsSearches = emailsToShow;
        }
    },
    computed: {
        emailsToShow() {
            let emailsToFilter = this.emails;
            if (this.emailsSearches || this.emailsSearches && this.emailsSearches.length) {
                emailsToFilter = this.emailsSearches;
            }
            if (emailsToFilter) {
                switch (this.listOf) {
                    case 'Inbox':
                        return (emailsToFilter).filter(email => !email.isDraft);
                    case 'Stars':
                        return (emailsToFilter).filter(email => email.isStar);
                    case 'Drafts':
                        return (emailsToFilter).filter(email => email.isDraft);
                    case 'Sent':
                        console.log(emailsToFilter);
                        return (emailsToFilter).filter(email => email.from === this.user.name);
                }
                return (emailsToFilter).filter(email => !email.isDraft);
            }
        },
        EmailsUnReadShow() {
            return this.emailsToShow.filter(email => !email.isRead)
        },
        unReadCount() {
            if (!this.emails) return;
            return this.emails.reduce((acc, email) => {
                if (!email.isRead) acc++;
                return acc;
            }, 0)
        },
        isActiveInbox() {
            return { 'active': (this.listOf === 'Inbox') }
        },
        isActiveStars() {
            return { 'active': (this.listOf === 'Stars') }
        },
        isActiveDrafts() {
            return { 'active': (this.listOf === 'Drafts') }
        },
        isActiveSent() {
            return { 'active': (this.listOf === 'Sent') }
        }
    }
}