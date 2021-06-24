import emailPreview from './email-preview.js'
import { emailService } from '../services/email-service.js';
export default {
    props: ['emails'],
    template: `
    <ul class="email-list">
       <li v-for="email in emails" :key="email.id">
            <email-preview :email="email" @click.native="clickEmail(email)"/>
       </li>
       <li v-if="isEmptyList"><h1>No have emails to show </h1></li>
    </ul>
  `,
    components: {
        emailPreview,
    },
    methods: {
        clickEmail(email) {
            email.isRead = true;
            emailService.updateEmail(email)
                .then(email => {
                    this.$router.push(`/email/${email.id}`);
                })
        },
    },
    computed: {
        isEmptyList() {
            return (!this.emails || this.emails.length === 0);
        }
    }
};