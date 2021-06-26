import { noteService } from '../services/note-service.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
  template: `
        <section>
            <form @submit.prevent="addNote" class="add-note-form">
            <select name="noteType" v-model="noteType" >
                <option value="txt">Text</option>
            </select>
                <input class="note-add-title" v-model="note.info.title" v-if="note" type="text" name="addNoteTitle" placeholder="Title" >
                <input class="note-add-txt" v-model="note.info.txt" v-if="note" @focus="isEditing=true"  type="text" name="addNoteText" placeholder="Take a note..." >
                <button class="btn-add-note icon">Add note</button>
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
    submitNote() {
      console.log('Submit note of type', this.noteType);
    },
    addNote() {
      noteService.addNote(this.note).then(() => eventBus.$emit('renderNotes'));
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
