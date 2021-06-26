export default {
  props: ['notes'],
  template: `
    <div class="note-search"> 
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
        const searchStr = this.searchBy.toLowerCase();
        notesToShow = this.notes.filter((note) => {
          return note.info.title.toLowerCase().includes(searchStr);
        });
      }
      this.$emit('search', notesToShow);
    },
  },
};
