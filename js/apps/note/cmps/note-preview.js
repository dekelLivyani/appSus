import { eventBus } from '../../../services/event-bus-service.js';
import { noteService } from '../services/note-service.js';

noteService;
export default {
  props: ['note'],
  template: `
        <li class="note-preview-cont">
            <router-link :to="noteURL" class="note-preview">
                <h3 class="note-title">{{note.info.title}}</h3>
                <p class="note-txt">{{note.info.txt}}</p>
            </router-link>
            <button class="removeNote" @click="removeNote">🗑</button>
        </li>       
    `,
  methods: {
    removeNote() {
      noteService.removeNote(this.note).then(() => eventBus.$emit('renderNotes'));
    },
  },
  computed: {
    noteURL() {
      return `/note/${this.note.id}`;
    },
  },
};

// id: utilService.makeId(),
//       created: Date.now(),
//       lastEdited: Date.now(),
//       type: 'NoteTxt',
//       isPinned: false,
//       info: {
//         title: `Title ${i}`,
//         txt: noteTxt,
