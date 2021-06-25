export default {
  props: ['note'],
  template: `
      <section v-if="note" class="note-details" :style="{ 'background-color': note.color }">
          <form @submit.prevent="editNote">
                <input type="text" class="note-title" v-model="noteContent.title">
                <textarea rows="10" cols="20"class="note-txt" v-model="noteContent.txt"> </textarea>
            </form>
      </section>
      `,
  data() {
    return {
      noteContent: { title: this.note.info.title, txt: this.note.info.txt },
    };
  },
  created() {
    this.noteContent.title = this.note.info.title;
    this.noteContent.txt = this.note.info.txt;
  },
};
// TODO: emit
