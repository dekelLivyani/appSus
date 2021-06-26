import { noteService } from '../services/note-service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import noteTxtAdd from './note-add-types/note-txt-add.js';
import noteImgAdd from './note-add-types/note-img-add.js';

export default {
  template: `
      <section class="add-note-cont">
          <form @submit.prevent="addNote" class="add-note-form-dyn">
            <component v-if="note" :is="note.type +'Add'" @updateNote="updateNote"></component>
            <button class="note-type-select txt icon" @click="getNewNote('noteTxt')" type="button"></button>
            <button class="note-type-select img icon" @click="getNewNote('noteImg')" type="button"></button>
            <button class="note-type-select vid icon" @click="getNewNote('noteVid')" type="button"></button>
            <button class="note-type-select list icon" @click="getNewNote('noteList')" type="button"></button>
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
      noteService.getEmptyNote(type).then((note) => {
        this.note = note;
        console.log(this.note.type);
      });
    },
    updateNote(newNote) {
      if (newNote.type === 'noteTxt') this.note.info.txt = newNote.info.txt;
    },
    addNote() {
      noteService.addNote(this.note).then(() => eventBus.$emit('renderNotes'));
    },
  },
  computed: {
    isTxt() {
      return this.note && this.note.type === 'noteTxt';
    },
    placeholder() {
      switch (this.note.type) {
        case 'noteTxt':
          return 'Enter text...';
        case 'noteImg':
          return 'Enter an image URL...';

        default:
          'Enter text...';
          break;
      }
    },
  },
  created() {
    this.getNewNote('noteTxt');
  },
  components: {
    noteTxtAdd,
    noteImgAdd,
  },
};
