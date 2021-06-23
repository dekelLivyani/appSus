import { eventBus } from '../../../services/event-bus-service.js'
export default {
    props: ['email'],
    template: `
         <article class="email-preview" :class="classByRead">
        <p  class="subject">{{email.subject}} </p>
        <p class="body">{{email.body}}</p>
        <p class="sent-at">
           <span> {{formatDate.date}}</span>
           <span> {{formatDate.time}}</span>
        </p>
        <div class="buttons">
        <button class="remove-btn" @click.stop="removeEmail(email.id)" title="delete">🗑</button>
        </div>
        </article>
   `,
    methods: {
        removeEmail(id) {
            eventBus.$emit('removeEmail', id)
            this.$emit('removeEmail', id);
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
        classByRead() {
            return { 'email-read': this.email.isRead }
        }
    }

};