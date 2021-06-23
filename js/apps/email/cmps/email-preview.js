export default {
    props: ['email'],
    template: `
         <article class="email-preview">
        <p  class="subject">{{email.subject}} </p>
        <p class="body">{{email.body}}</p>
        <p class="sent-at">
           <span> {{formatDate.date}}</span>
           <span> {{formatDate.time}}</span>
        </p>
        </article>
   `,
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

};