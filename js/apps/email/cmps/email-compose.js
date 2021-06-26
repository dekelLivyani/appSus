import { eventBus } from "../../../services/event-bus-service.js";
import { emailService } from "../services/email-service.js";

export default {
    props: ['emailToReplay'],
    template: `
      <form class="email-compose" @submit.prevent="composeEmail">
         <div class="title">      
            <h2>{{title}}</h2>
            <button class="icon close" @click="closeCompose">X</button>
         </div>
         <div class="main-compose">
         <label for="to">To:</label>
         <input id="to" type="text" v-model="email.to">
         <label for="subject">Subject:</label>
         <input id="subject" type="text" v-model="email.subject">
         <textarea class="body"  v-model="email.body">
         </textarea>
         <div class="buttons">
          <button class="send" type="submit" @click="setDraft(false)">Send</button>
          <button class="send" type="submit" @click="setDraft(true)">As Draft</button>
          </div>
          </div>
      </form>
 `,
    data() {
        return {
            email: {
                subject: null,
                body: null,
                from: null,
                to: null,
                isRead: false,
                isStar: false,
                sentAt: null,
            },
            isExit: false,
        }
    },
    created() {
        this.makeInnerText();
    },
    methods: {
        composeEmail() {
            if (this.isExit) return
            if (!this.email.subject || !this.email.to || !this.email.body) {
                let txt;
                if (!this.email.body) txt = 'Body email is required.';
                if (!this.email.subject) txt = 'Subject is required.';
                if (!this.email.to) txt = 'Recipient is required.';
                const msg = {
                    txt,
                    type: 'error'
                }
                eventBus.$emit('show-msg', msg);
                return;
            }
            this.email.sentAt = Date.now();
            this.$emit('addEmail', this.email)
            if (this.$router.history.current.fullPath !== '/email') {
                this.$router.push('/email')
            }
            this.makeEmptyEmail();
        },
        setDraft(deff) {
            this.email.isDraft = deff;
        },
        closeCompose() {
            this.isExit = true;
            this.$emit('closeCompose')
            const { emailId } = this.$route.params;
            if (!this.emailToReplay && !emailId) {
                this.makeEmptyEmail()
            } else
                this.makeInnerText();
            setTimeout(() => this.isExit = false, 2000)
        },
        makeInnerText() {
            if (this.emailToReplay) {
                const to = this.emailToReplay.from;
                const from = this.emailToReplay.to;
                this.email.to = to.name;
                this.email.from = { name: from };
                this.email.subject = "Re: "
                this.email.body = null;
            } else {
                const { emailId } = this.$route.params;
                if (emailId) {
                    emailService.getById(emailId)
                        .then(email => this.email = email);
                }
            }
        },
        makeEmptyEmail() {
            this.email = {
                subject: null,
                body: null,
                from: null,
                to: null,
                isRead: false,
                isStar: false,
                sentAt: null,
            };
        }
    },
    computed: {
        title() {
            return (this.$route.params.emailId && !this.emailToReplay) ? 'Edit Message' : 'New Message';
        },
    },
};