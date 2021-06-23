import noteService from '../services/note-service.js';

export default {
  template: `
    <section class="note-app">
        <h1 class="note-app-title">Welcome to Note!</h1>
    </section>
    `,
  data() {
    return {
      notes: null,
    };
  },
  methods: {
    getNotes() {
      noteService.query().then((notes) => console.log(notes));
    },
  },
  created() {
    this.getNotes();
  },
};
