import { noteService } from '../services/note-service.js';

export default {
  template: `
        <section class="add-note-cont">
            <form @submit="submit" >
                <input ref="noteContent" type="text" name="addNote" placeholder="Take a note..." >
                <button class="btd-add-note">Add note</button>
            </form>
        </section>
    `,
  methods: {
    submit() {},
  },
  mounted() {
    this.$refs.noteContent.focus();
  },
};
