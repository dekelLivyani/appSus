import { noteService } from '../services/note-service.js';

export default {
  template: `
        <section class="add-note-cont">
            <form @submit="addNote" >
            <select name="noteType" v-model="noteType" >
                <option value="txt">Text</option>
                <!-- <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option> -->
            </select>
                <input ref="noteContent" type="text" name="addNote" placeholder="Take a note..." >
                <button class="btd-add-note">Add note</button>
            </form>
        </section>
    `,
  data() {
    return {
      note: null,
      noteId: null,
      noteType: 'txt',
    };
  },
  methods: {
    addNote() {
      //   noteService.addNote(this.note);
    },
  },
  watch: {},
  mounted() {
    this.$refs.noteContent.focus();
  },
  created() {},
};
