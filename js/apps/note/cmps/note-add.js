import { noteService } from '../services/note-service.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
  template: `
        <section class="add-note-cont">
            <form @submit.prevent="addNote">
            <select name="noteType" v-model="noteType" >
                <option value="txt">Text</option>
                <!-- <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option> -->
            </select>
                <input class="note-add-title" v-model="note.info.title" v-if="note && isEditing" type="text" name="addNoteTitle" placeholder="Title" >
                <input class="note-add-txt" v-model="note.info.txt" v-if="note" @focus="isEditing=true"  type="text" name="addNoteText" placeholder="Take a note..." >
                <button class="btd-add-note">Add note</button>
            </form>
        </section>
    `,
  data() {
    return {
      isEditing: false,
      note: null,
      noteType: 'txt',
    };
  },
  methods: {
    addNote() {
      noteService.addNote(this.note).then(() => eventBus.$emit('addedNote'));
    },
    getEmptyNote() {
      return noteService.getEmptyNote(this.noteType).then((note) => {
        return note;
      });
    },
  },
  mounted() {},
  created() {
    this.getEmptyNote().then((note) => (this.note = note));
  },
};
// Note sample:
// id: utilService.makeId(),
// created: Date.now(),
// lastEdited: Date.now(),
// type: '',
// isPinned: false,
// info: {
//   title: '',
//   txt: '',
// }
