export default {
  props: ['note'],
  template: `
      <section v-if="note" class="note-details" :style="{ 'background-color': note.color }">
          <form @submit.prevent="editNote">
                <input type="text" class="note-title" v-model="note.info.title">
                <textarea rows="10" cols="20"class="note-txt" v-model="note.info.txt"> </textarea>
            </form>
      </section>
      `,
  data() {
    return {
      noteTitle: null,
      noteTxt: null,
    };
  },
  watch: {
    noteTitle() {},
  },
};
// TODO: emit
