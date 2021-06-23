import { noteService } from '../services/note-service.js';

export default {
  template: `
      <section v-if="note" class="note-details">
        <h2 class="note-title">{{note.info.title}}</h2>
        <p class="note-txt">{{note.info.txt}}</p>
        <p class="lastEdited">Last edited: {{editedAt.time}}, {{editedAt.date}}</p>
        <router-link to="/note">
            <button class="back-to-notes" @click="backToNotes">Back to Notes</button>
        </router-link>
        <router-link :to="'/note/'+prevNoteId">
            <button>Previous note</button>
        </router-link>
        <router-link :to="'/note/'+nextNoteId">
            <button>Next note</button>
        </router-link>
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
    backToNotes() {},
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
          noteService.getPrevNoteId(noteId).then((noteId) => (this.prevNoteId = noteId));
          noteService.getNextNoteId(noteId).then((noteId) => (this.nextNoteId = noteId));
        });
      },
    },
  },
};
