import { eventBus } from '../../../services/event-bus-service.js';
import { noteService } from '../services/note-service.js';

noteService;
export default {
  props: ['note'],
  template: `
            <!-- <router-link :to="noteURL" class="note-preview"> -->
            <li class="note-preview-cont" title="Edit the note">
                <h3 class="note-title">{{note.info.title}}</h3>
                <p class="note-txt">{{note.info.txt}}</p>
                <button class="removeNote" @click.stop="removeNote" title="Delete">🗑</button>
            </li>       
        <!-- </router-link> -->
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
