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
         <input id="subject" type="text"  v-model="email.subject">
         <textarea class="body" rows="12" cols="55" v-model="email.body">
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
                isDraft: false,
                isStar: false,
                sentAt: null,
            }
        }
    },
    created() {
        if (this.emailToReplay) {
            const to = this.emailToReplay.from;
            const from = this.emailToReplay.to;
            this.email.to = to.name;
            this.email.from = { name: from };
            this.email.subject = "Re: "
        } else {
            const { emailId } = this.$route.params;
            if (emailId) {
                emailService.getById(emailId)
                    .then(email => this.email = email);
            }
        }
    },
    methods: {
        composeEmail() {
            if (!this.email.subject || !this.email.to || !this.email.body) {
                console.log('Empty Cell!');
                return;
            }
            this.email.sentAt = Date.now();
            this.$emit('addEmail', this.email)
            this.$router.push('/email')
        },
        setDraft(deff) {
            this.email.isDraft = deff;
        },
        closeCompose() {
            this.$emit('closeCompose')
        }
    },
    computed: {
        title() {
            return this.$route.params.emailId ? 'Edit Message' : 'New Message';
        },
    },
};