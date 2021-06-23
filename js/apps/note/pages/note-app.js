import { noteService } from '../services/note-service.js';
import noteList from '../cmps/note-list.js';
import noteFilter from '../cmps/note-filter.js';
import noteAdd from '../cmps/note-add.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
  template: `
    <section class="note-app">
        <h1 class="note-app-title">Welcome to Note!</h1>
        <note-filter />
        <note-add />
        <note-list v-show="notes" :notes="notesToShow">Note List</note-list>
    </section>
    `,
  data() {
    return {
      notes: null,
    };
  },
  computed: {
    notesToShow() {
      return this.notes;
    },
  },
  methods: {
    renderNotes() {
      noteService.query().then((notes) => (this.notes = notes));
    },
  },
  watch: {
    notes() {},
  },
  created() {
    this.renderNotes();
    eventBus.$on('addedNote', this.renderNotes);
  },
  components: {
    noteList,
    noteFilter,
    noteAdd,
  },
};
