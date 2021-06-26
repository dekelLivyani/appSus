import emailPreview from './email-preview.js'
import { emailService } from '../services/email-service.js';
export default {
    props: ['emails', 'listOf'],
    template: `
    <ul class="email-list">
       <li v-for="email in emails" :key="email.id"
        @mouseover="emailIsHover = email.id" @mouseout="emailIsHover = email.id">
            <email-preview :email="email" :listOf="listOf" :emailIsHover="emailIsHover" @click.native="clickEmail(email)"
           />
       </li>
       <li v-if="isEmptyList" class="no-emails"><h1>No emails to show </h1></li>
    </ul>
  `,
    components: {
        emailPreview,
    },
    data() {
        return {
            emailIsHover: false,
        }
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