import { eventBus } from '../../../services/event-bus-service.js'
import emailDescription from '../../email/cmps/email-description.js'
import { emailService } from '../services/email-service.js';

export default {
    props: ['email', 'emailIsHover', 'listOf'],
    template: `
         <article class="email-preview" :class="classToEmail">
         <button class="star-btn icon" :class="classToStared" @click.stop="toggleStar" :title="titleStar"></button>
        <p class="subject" v-if="listOf !== 'Sent'">{{email.from.name}} </p>
        <p class="subject" v-else> To: {{email.to}} </p>
        <div class="body-container">
        <email-description class="body" :desc="subjectAndBody" :isTextOpen="isTextOpen"/>
        </div>
        <p class="sent-at" v-if="!isHover">
           <span> {{formatDate}}</span>
        </p>
        <div class="buttons-icon" v-else>
        <button class="read-more icon":class="{'is-open':isTextOpen}" @click.stop="toggleLongText" v-if="isLongText" :title="titleArrow"></button>
        <button class="remove-btn icon" @click.stop="removeEmail" title="Delete"></button>
        <button class="read-btn icon" @click.stop="setRead" :title="titleRead"></button>
        </div>
        </article>
   `,
    components: {
        emailDescription,
    },
    data() {
        return {
            isTextOpen: false,
            subjectAndBody: this.email.subject + ' - ' + this.email.body,
        }
    },
    methods: {
        removeEmail() {
            eventBus.$emit('removeEmail', this.email.id)
        },
        setRead() {
            this.email.isRead = !this.email.isRead;
            emailService.updateEmail(this.email)
                .then(() => {})
        },
        toggleLongText() {
            this.isTextOpen = !this.isTextOpen;
        },
        toggleStar() {
            this.email.isStar = !this.email.isStar;
            emailService.updateEmail(this.email)
                .then(() => {})
        },
    },
    computed: {
        formatDate() {
            var fullDate = new Date(this.email.sentAt);
            return ((fullDate.getDate() + '').padStart(2, '0') + '/' +
                ((fullDate.getMonth() + 1) + '').padStart(2, '0'));
        },
        isHover() {
            return (this.emailIsHover === this.email.id)
        },
        classToEmail() {
            return { 'is-stared': this.email.isStar, 'is-readed': !this.email.isRead, 'email-read': this.email.isRead }
        },
        titleRead() {
            return (this.email.isRead) ? 'Read' : 'Unread';
        },
        titleArrow() {
            return (this.isTextOpen) ? 'Close' : 'Open';
        },
        titleStar() {
            return (this.email.isStar) ? 'Started' : 'Not Started';
        },
        isLongText() {
            return (this.email.body.length > 155)
        },
        classToStared() {
            return { 'stared': this.email.isStar }
        },
    }

};