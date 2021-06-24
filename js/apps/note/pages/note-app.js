import { noteService } from '../services/note-service.js';
import noteList from '../cmps/note-list.js';
import noteFilter from '../cmps/note-filter.js';
import noteAdd from '../cmps/note-add.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
  template: `
    <section class="note-app">
        <div class="header-note-app">
          <div class="logo">
            <img src="./img/logos/note-logo.png" class="logo-img">
          </div>        
          <note-filter />
        </div>
        <note-add />
        <h1 v-if="isNotes" class="list-empty-state">No notes! Try adding some...</h1>
        <h2 class="list-title" v-if="!arePinned">Pinned</h2>
        <note-list v-show="pinnedNotes" :notes="pinnedNotes">Pinned notes</note-list>
        <h2 class="list-title" v-if="!arePinned">Others</h2>
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
  computed: {
    arePinned() {
      return !this.pinnedNotes || !this.pinnedNotes.length;
    },
    isNotes() {
      return !this.notes || !this.notes.length;
    },
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
