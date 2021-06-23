import emailPreview from './email-preview.js'

export default {
    props: ['emails'],
    template: `
    <ul class="email-list">
       <li v-for="email in emails" :key="email.id">
            <email-preview :email="email"/>
       </li>
    </ul>
  `,
    methods: {},
    components: {
        emailPreview,
    }
};