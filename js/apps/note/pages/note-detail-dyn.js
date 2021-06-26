import { eventBus } from '../../../services/event-bus-service.js';
import { noteService } from '../services/note-service.js';
import noteActionsDyn from '../cmps/note-actions-dyn/note-actions-dyn.js';
import noteTxtDetail from './note-detail-types/note-txt-detail.js';
import noteImgDetail from './note-detail-types/note-img-detail.js';

export default {
  template: `
      <section v-if="note" class="note-details" :style="{ 'background-color': note.color }">
      <h2>Dyn</h2>
        <div class="note-detail-cont">
          <form @submit.prevent="editNote">
            <component :is="note.type + 'Detail'" :note="note" @updateNote="updateNote">
            </component>
          </form>
          <p class="lastEdited">Last edited: {{editedAt.time}}, {{editedAt.date}}</p>
          <div class="buttons-cont">
              <router-link to="/noteDyn">
              <button class="back-to-notes icon" @click="editNote" title="Save"></button>
            </router-link>
            <note-actions-dyn :propNote="note" @updateColor="renderColor"/>
          </div>
        </div>
        
      </section>
      `,
  data() {
    return {
      note: null,
    };
  },
  methods: {
    updateNote(newNote) {
      if (newNote.type === 'noteTxt') {
        this.note.info.title = newNote.info.title;
        this.note.info.txt = newNote.info.txt;
      }
      if (newNote.type === 'noteImg') {
        this.note.info.title = newNote.info.title;
        this.note.info.url = newNote.info.url;
      }
    },
    editNote() {
      this.note.lastEdited = Date.now();
      noteService.editNote(this.note);
      const msg = {
        txt: 'Note saved!',
        type: 'success',
      };
      eventBus.$emit('show-msg', msg);
    },
    renderColor(color) {
      this.note.color = color;
      this.editNote();
    },
  },
  computed: {
    editedAt() {
      const fullDate = new Date(this.note.lastEdited);
      return {
        date: (fullDate.getDate() + '').padStart(2, '0') + '/' + (fullDate.getMonth() + 1 + '').padStart(2, '0') + '/' + (fullDate.getFullYear() + '').padStart(2, '0'),
        time: (fullDate.getHours() + '').padStart(2, '0') + ':' + (fullDate.getMinutes() + '').padStart(2, '0'),
      };
    },
  },
  watch: {
    '$route.params.noteId': {
      immediate: true,
      handler() {
        const { noteId } = this.$route.params;
        noteService.getById(noteId).then((note) => {
          this.note = note;
        });
      },
    },
  },
  components: {
    noteActionsDyn,
    noteTxtDetail,
    noteImgDetail,
  },
};
