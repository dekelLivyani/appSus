import { eventBus } from '../../../services/event-bus-service.js';
import { noteService } from '../services/note-service.js';

export default {
  props: ['propNote'],
  template: `
        <button v-if="note" class="pinNote icon" @click.stop="pinNoteToggle" title="Pin">
            <img :src="pinImg">
        </button>
    `,
  data() {
    return {
      note: null,
    };
  },
  methods: {
    pinNoteToggle() {
      this.note.isPinned = !this.note.isPinned;
      noteService.updateNote(this.note).then(() => eventBus.$emit('renderNotes'));
    },
  },
  computed: {
    pinImg() {
      return this.note.isPinned ? 'img/note/pin-full.png' : 'img/note/pin-hollow.png';
    },
  },
  created() {
    noteService.cloneNote(this.propNote).then((note) => (this.note = note));
  },
};
