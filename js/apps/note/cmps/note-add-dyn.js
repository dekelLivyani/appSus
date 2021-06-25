import { noteService } from '../services/note-service.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
  template: `
      <section class="add-note-cont">
          <form @submit.prevent="addNote" class="add-note-form-dyn">
            <input type="text" v-if="isTxt" v-model="note.info.txt" class="note-add-txt" placeholder="Enter text..." >
            <button class="note-type-select txt icon" @click="getNewNote('noteTxt')" type="button"></button>
            <button class="note-type-select img icon" @click="getNewNote('noteImg')" type="button"></button>
            <button class="btn-add-note icon" title="Add the note"></button>
          </form>
      </section>
    `,
  data() {
    return {
      note: null,
    };
  },
  methods: {
    getNewNote(type) {
      // TODO: change placeholder, add img note CRUD
      console.log('getting note of type', type);
      this.getEmptyNote(type).then((note) => (this.note = note));
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
  computed: {
    isTxt() {
      return this.note && this.note.type === 'noteTxt';
    },
  },
  created() {
    this.getNewNote('noteTxt');
  },
};
// id: 'KS0qjHo',
//     created: 1624612963984,
//     lastEdited: 1624612963984,
//     type: 'NoteTxt',
//     isPinned: false,
//     color: 'whitesmoke',
//     info: {
//       title: 'Call Mom',
//       txt: 'To say Happy Mothers day',
//     },
