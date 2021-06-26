export default {
    props: ['emails'],
    template: `
      <div class="email-sort">
   <select v-model="sortBy" class="sort-select" @change="sortEmails">
               <option value="Date">Date</option>
               <option value="Subject">Subject</option>
               <option value="UnRead">UnRead</option>
            </select>
</div>
  `,
    data() {
        return {
            sortBy: 'Date',
        }
    },
    methods: {
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
    }
}