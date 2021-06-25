export default {
  props: ['note'],
  template: `
      <section v-if="note" class="note-details" :style="{ 'background-color': note.color }">
        <input type="text" class="note-title" @input="updateNote" v-model="newNote.info.title">
        <textarea rows="10" cols="20"class="note-txt" @input="updateNote" v-model="newNote.info.txt"> </textarea>
      </section>
      `,
  data() {
    return {
      newNote: { type: 'noteTxt', info: { title: null, txt: null } },
    };
  },
  methods: {
    updateNote() {
      this.$emit('updateNote', this.newNote);
    },
  },
  created() {
    this.newNote.title = this.note.info.title;
    this.newNote.txt = this.note.info.txt;
  },
};
// TODO: emit
