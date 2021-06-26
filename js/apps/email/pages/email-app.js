import emailList from '../cmps/email-list.js'
import emailCompose from '../cmps/email-compose.js'
import emailSearch from '../cmps/email.search.js'
import emailSort from '../cmps/email-sort.js'
import { emailService } from '../services/email-service.js'
import { eventBus } from '../../../services/event-bus-service.js'

export default {
    template: `
     <section class="email-app">
        <div class="header-email-app">
             <img src="/img/logos/email-logo.png"/>      
             <email-search class="search" :emails="emails" @EmailsAfterSearch="EmailsAfterSearch"/>
          <div class="info-place">
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
         <button class="add-compose"  @click="composeEmail"> Compose</button>
      </div>
     <email-list v-if="!isUnReadTop" :emails="emailsToShow" :listOf="listOf"/>
     <email-list v-else :emails="EmailsUnReadShow" :listOf="listOf"/>
     </div>
     <email-compose class="compose-email" :class="{'is-open' : isComposeEmail}" @closeCompose="isComposeEmail = false" @addEmail="addEmail"/>   
 </section>
 `,
    data() {
        return {
            emails: null,
            isComposeEmail: false,
            listOf: 'Inbox',
            isUnReadTop: false,
            emailsSearches: null,
            user: emailService.getUser()

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
    },
    methods: {
        renderEmails() {
            emailService.query()
                .then(emails => {
                    this.emails = emails
                })
        },
        composeEmail() {
            this.isComposeEmail = true;
        },
        addEmail(newEmail) {
            this.isComposeEmail = false;
            emailService.addEmail(newEmail)
                .then(email => {
                    this.renderEmails();
                    console.log(newEmail.isDraft);
                    const txt = (newEmail.isDraft) ? 'Email saved in Drafts!' : 'Email sent!'
                    const msg = {
                        txt,
                        type: 'success'
                    }
                    eventBus.$emit('show-msg', msg);
                })
                .catch(err => {
                    const msg = {
                        txt: err + 'Error, please try again later',
                        type: 'error'
                    }
                    eventBus.$emit('show-msg', msg);

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
                        return (emailsToFilter).filter(email => email.from.id === this.user.id);
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