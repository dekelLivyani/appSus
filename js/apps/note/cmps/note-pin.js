import { eventBus } from '../../../services/event-bus-service.js';
import { noteService } from '../services/note-service.js';

export default {
  props: ['propNote'],
  template: `
        <button v-if="note" class="icon pinNote" :class="isPinned" @click.stop="pinNoteToggle" title="Pin">
            <!-- <img :src="pinImg"> -->
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
    isPinned() {
      if (this.note.isPinned) return 'pinned';
    },
  },
  created() {
    noteService.cloneNote(this.propNote).then((note) => (this.note = note));
  },
};
