import { eventBus } from '../../../services/event-bus-service.js';
import { noteService } from '../services/note-service.js';
import noteActions from './note-actions.js';

noteService;
export default {
  props: ['note'],
  template: `
    <li class="note-preview-cont" title="Edit the note" :style="renderColor">
        <h3 class="note-title">{{note.info.title}}</h3>
        <p class="note-txt">{{note.info.txt}}</p>
        <button class="pinNote" @click.stop="pinNoteToggle" title="Pin">
            <img :src="pinImg">
        </button>
        <note-actions :note="note" @updateColor="updateColor"/>
    </li>       
    `,
  methods: {
    pinNoteToggle() {
      this.note.isPinned = !this.note.isPinned;
      noteService.updateNote(this.note).then(() => eventBus.$emit('renderNotes'));
    },
    renderColor() {
      if (this.note.color) return this.note.color;
      return 'inherit';
    },
    updateColor() {},
  },
  computed: {
    noteURL() {
      return `/note/${this.note.id}`;
    },
    pinImg() {
      return this.note.isPinned ? 'img/note/pin-full.png' : 'img/note/pin-hollow.png';
    },
  },
  created() {},
  components: {
    noteActions,
  },
};

//        id: utilService.makeId(),
//       created: Date.now(),
//       lastEdited: Date.now(),
//       type: 'NoteTxt',
//       isPinned: false,
//       info: {
//         title: `Title ${i}`,
//         txt: noteTxt,
