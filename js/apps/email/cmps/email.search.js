export default {
    props: ['emails'],
    template: `
    <div class="email-search"> 
    <input v-model="searchBy" type="text" @input="search" placeholder="Search...">
    </div>
   `,
    data() {
        return {
            searchBy: null,
        }
    },
    methods: {
        search() {
            let emailsToShow = [];
            if (!this.searchBy) emailsToShow = this.emails;
            else {
                const searchStr = this.searchBy.toLowerCase();
                emailsToShow = this.emails.filter(email => {
                    return (email.subject.toLowerCase().includes(searchStr) ||
                        email.body.toLowerCase().includes(searchStr))
                });
            }
            this.$emit('EmailsAfterSearch', emailsToShow);
        },
    }
}