import { noteService } from '../services/note-service.js';
import notePin from './note-pin.js';
import noteActions from './note-actions.js';

export default {
  template: `
      <section v-if="note" class="note-details" :style="{ 'background-color': note.color }">
        <div class="note-detail-cont">
          <note-pin :propNote="note"/>
          <form @submit.prevent="editNote">
                <input type="text" class="note-title" v-model="note.info.title">
                <textarea rows="10" cols="20"class="note-txt" v-model="note.info.txt"> </textarea>
                <p class="lastEdited">Last edited: {{editedAt.time}}, {{editedAt.date}}</p>
            </form>
            <div class="buttons-cont">
              <router-link :to="'/note/'+prevNoteId">
                  <button title="Previous note" class="prev-note icon"></button>
              </router-link>
              <router-link :to="'/note/'+nextNoteId">
                  <button title="Next note" class="next-note icon" ></button>
              </router-link>
              <router-link to="/note">
              <button class="back-to-notes icon" @click="editNote" title="Close"></button>
            </router-link>
            <note-actions :propNote="note" @updateColor="renderColor"/>
            </div>
        </div>
        
      </section>
      `,
  data() {
    return {
      note: null,
      prevNoteId: null,
      nextNoteId: null,
    };
  },
  methods: {
    editNote() {
      this.note.lastEdited = Date.now();
      noteService.editNote(this.note);
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
          noteService.getNeighborById(noteId, -1).then((noteId) => (this.prevNoteId = noteId));
          noteService.getNeighborById(noteId, 1).then((noteId) => (this.nextNoteId = noteId));
        });
      },
    },
  },
  components: {
    notePin,
    noteActions,
  },
};
