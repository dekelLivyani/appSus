export default {
  template: `
    <section>
          <input type="text" v-model="newNote.info.txt" @input="updateNote" class="note-add-txt" placeholder="Enter text..." >
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
};
