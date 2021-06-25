export default {
  props: ['note'],
  template: `
      <section v-if="note" class="note-details" :style="{ 'background-color': note.color }">
          <form >
                <input type="text" class="note-title" v-model="note.info.title">
                <textarea rows="10" cols="20"class="note-txt" v-model="note.info.txt"> </textarea>
            </form>
      </section>
      `,
  data() {
    return {
      note: { txt: null },
    };
  },
  watch: {
    noteTitle() {},
  },
};
// TODO: emit
