import { noteService } from '../services/note-service.js';
import noteListDyn from '../cmps/note-list-dyn.js';
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
          <h1 class="list-empty-state" v-if="!isPinnedNotes && !isNotes">No notes! Try adding some...</h1>
          <h2 class="list-title" v-if="isPinnedNotes">Pinned</h2>
          <note-list-dyn :notes="pinnedNotes" v-if="isPinnedNotes">Pinned notes</note-list-dyn>
          <h2 class="list-title" v-if="isNotes && isPinnedNotes">Others</h2>
          <note-list-dyn  v-show="notes" v-if="isNotes" :notes="notes">Note List</note-list-dyn>
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
    isPinnedNotes() {
      return this.pinnedNotes && this.pinnedNotes.length;
    },
    isNotes() {
      return this.notes && this.notes.length;
    },
  },
  created() {
    this.renderNotes();
    eventBus.$on('renderNotes', this.renderNotes);
  },
  components: {
    noteListDyn,
    noteFilter,
    noteAdd,
  },
};
