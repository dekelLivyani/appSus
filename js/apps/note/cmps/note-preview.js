import { eventBus } from '../../../services/event-bus-service.js';
import { noteService } from '../services/note-service.js';
import noteActions from './note-actions.js';

noteService;
export default {
  props: ['noteId'],
  template: `
    <li v-if="note" class="note-preview-cont" title="Edit the note" :style="{ 'background-color': note.color }">
        <h3 class="note-title">{{note.info.title}}</h3>
        <p class="note-txt">{{note.info.txt}}</p>
        <button class="pinNote" @click.stop="pinNoteToggle" title="Pin">
            <img :src="pinImg">
        </button>
        <note-actions :note="note" @updateColor="renderColor"/>
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
      console.log('TTcolor:', color);
      this.note.color = color;
      this.updateNotes();
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
    noteService.getById(this.noteId).then((note) => (this.note = note));
  },
  components: {
    noteActions,
  },
};
