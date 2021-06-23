import { emailService } from "../services/email-service.js";
export default {
    template: `
    <section class="email-details">
    <h2>Email-details </h2>
    <div>{{email.subject}} </div>
    <div>{{email.to}}</div>
    <div>{{email.body}}</div>
    <div class="sent-at">
      <span> {{formatDate.date}}</span>
      <span> {{formatDate.time}}</span>
   </div>
   <button class="remove-btn" @click="removeEmail(email.id)">🗑</button>
</section>
`,
    data() {
        return {
            email: {},
        }
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
        removeEmail(id) {
            emailService.removeEmail(id);
            this.$router.push('/email');
        }
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