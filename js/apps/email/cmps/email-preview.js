import { eventBus } from '../../../services/event-bus-service.js'
import emailDescription from '../../email/cmps/email-description.js'
export default {
    props: ['email'],
    template: `
         <article class="email-preview" :class="classByRead">
        <p class="subject">{{email.subject}} </p>
        <email-description :desc="email.body" :isTextOpen="isTextOpen"/>
        <p class="sent-at">
           <span> {{formatDate.date}}</span>
           <span> {{formatDate.time}}</span>
        </p>
        <div class="buttons">
        <button class="read-more icon" @click.stop="toggleLongText" v-if="isLongText" :title="titleArrow">{{iconArrow}}</button>
        <button class="star-btn icon" :class="classToStared" @click.stop="toggleStar" :title="titleStar">{{iconStar}}</button>
        <button class="remove-btn icon" @click.stop="removeEmail" title="Delete">🗑</button>
        <button class="read-btn icon" @click.stop="setRead" :title="titleRead">{{iconRead}}</button>
        </div>
        </article>
   `,
    components: {
        emailDescription,
    },
    data() {
        return {
            isTextOpen: false,
        }
    },
    methods: {
        removeEmail() {
            eventBus.$emit('removeEmail', this.email.id)
        },
        setRead() {
            this.email.isRead = !this.email.isRead;
        },
        toggleLongText() {
            this.isTextOpen = !this.isTextOpen;
        },
        toggleStar() {
            this.email.isStar = !this.email.isStar;
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
        titleRead() {
            return (this.email.isRead) ? 'Read' : 'Unread';
        },
        iconRead() {
            return (this.email.isRead) ? '🖂' : '✉';
        },
        titleArrow() {
            return (this.isTextOpen) ? 'Close' : 'Open';
        },
        iconArrow() {
            return (this.isTextOpen) ? '⇑' : '⇓';
        },
        titleStar() {
            return (this.email.isStar) ? 'Started' : 'Not Started';
        },
        iconStar() {
            return (this.email.isStar) ? '★' : '☆';
        },
        isLongText() {
            return (this.email.body.length > 155)
        },
        classByRead() {
            return { 'email-read': this.email.isRead }
        },
        classToStared() {
            return { 'stared': this.email.isStar }
        }
    }

};