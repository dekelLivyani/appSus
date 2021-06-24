import { eventBus } from '../../../services/event-bus-service.js';
import { noteService } from '../services/note-service.js';
import noteActions from './note-actions.js';
import notePin from './note-pin.js';

noteService;
export default {
  props: ['propNote'],
  template: `
    <li v-if="note" class="note-preview-cont" title="Edit the note" :style="{ 'background-color': note.color }">
        <h3 class="note-title">{{note.info.title}}</h3>
        <p class="note-txt">{{note.info.txt}}</p>
        <note-pin :propNote="note"/>
        <note-actions :propNote="note" @updateColor="renderColor"/>
    </li>       
    `,
  data() {
    return {
      note: null,
    };
  },
  methods: {
    pinNoteToggle() {
      this.note.isPinned = !this.note.isPinned;
      this.updateNotes();
    },
    updateNotes() {
      noteService.updateNote(this.note).then(() => eventBus.$emit('renderNotes'));
    },
    renderColor(color) {
      this.note.color = color;
      this.updateNotes();
    },
    updateNotes() {
      noteService.updateNote(this.note).then(() => eventBus.$emit('renderNotes'));
    },
  },
  computed: {
    noteURL() {
      return `/note/${this.note.id}`;
    },
    pinImg() {
      return this.note.isPinned ? 'img/note/pin-full.png' : 'img/note/pin-hollow.png';
    },
  },
  created() {
    noteService.cloneNote(this.propNote).then((note) => (this.note = note));
  },
  components: {
    noteActions,
    notePin,
  },
};
