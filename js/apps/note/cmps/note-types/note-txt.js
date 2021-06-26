import { eventBus } from '../../../../services/event-bus-service.js';
import { noteService } from '../../services/note-service.js';
import noteActionsDyn from '../note-actions-dyn/note-actions-dyn.js';
import notePin from '../note-pin.js';

export default {
  props: ['propNote'],
  template: `
    <li v-if="note" class="note-preview-cont" title="Edit the note" :style="{ 'background-color': note.color }">
        <h3 class="note-title">{{note.info.title}}</h3>
        <p class="note-txt">{{note.info.txt}}</p>
        <note-pin :propNote="note"/>
        <div class="bottom-preview-bar">
          <div class="note-icon txt" title="Text note"></div>
          <note-actions-dyn :propNote="note" @updateColor="renderColor"/>
        </div>
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
  },
  created() {
    noteService.cloneNote(this.propNote).then((note) => (this.note = note));
  },
  components: {
    noteActionsDyn,
    notePin,
  },
};
