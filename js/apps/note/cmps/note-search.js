export default {
  props: ['notes'],
  template: `
    <div class="email-search"> 
        <input v-model="searchBy" type="text" @input="search" placeholder="Search...">
    </div>
   `,
  data() {
    return {
      searchBy: null,
    };
  },
  methods: {
    search() {
      let notesToShow = {};
      if (!this.searchBy) {
        notesToShow = this.notes;
      } else {
        const searchTerm = this.searchBy.toLowerCase();
        notesToShow = this.notes.filter((note) => {
          return note.info.title.toLowerCase().includes(searchTerm);
        });
      }
      this.$emit('search', notesToShow);
    },
  },
};
// methods: {
//     search() {
//         let emailsToShow = [];
//         if (!this.searchBy) emailsToShow = this.emails;
//         else {
//             const searchStr = this.searchBy.toLowerCase();
//             emailsToShow = this.emails.filter(email => {
//                 return (email.subject.toLowerCase().includes(searchStr) ||
//                     email.body.toLowerCase().includes(searchStr))
//             });
//         }
//         this.$emit('EmailsAfterSearch', emailsToShow);
//     },
// }
