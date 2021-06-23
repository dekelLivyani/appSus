export default {
    template: `
      <form class="email-compose" @submit.prevent="composeEmail">
         <div class="title">      
            <h2>Mew Message</h2>
         </div>
         <label for="to">To::</label>
         <input id="to" type="text" v-model="newEmail.to">
         <label for="subject">Subject:</label>
         <input id="subject" type="text"  v-model="newEmail.subject">
         <textarea class="body" rows="8" cols="50" v-model="newEmail.body">
         </textarea>
          <button class="send" type="submit">Send</button>
      </form>
 `,
    data() {
        return {
            newEmail: {
                subject: null,
                body: null,
                to: null,
                isRead: false,
                sentAt: null,
            }
        }
    },
    methods: {
        composeEmail() {
            this.newEmail.sentAt = Date.now();
            this.$emit('addEmail', this.newEmail)
        }

    },
};