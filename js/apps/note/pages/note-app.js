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
        <note-list v-show="pinnedNotes" :notes="pinnedNotes">Pinned notes</note-list>
        <note-list v-show="notes" :notes="notes">Note List</note-list>
    </section>
    `,
  data() {
    return {
      notes: null,
      pinnedNotes: null,
    };
  },
  methods: {
    renderNotes() {
      noteService.query().then((notes) => {
        this.notes = notes.filter((note) => !note.isPinned);
        this.pinnedNotes = notes.filter((note) => note.isPinned);
      });
    },
  },
  watch: {
    notes() {},
  },
  created() {
    this.renderNotes();
    eventBus.$on('renderNotes', this.renderNotes);
  },
  components: {
    noteList,
    noteFilter,
    noteAdd,
  },
};
