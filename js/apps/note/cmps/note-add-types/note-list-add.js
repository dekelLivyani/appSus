export default {
  template: `
    <section>
          <input type="text" v-model="newNote.info.list" @input="updateNote" class="note-add-txt" placeholder="Enter a comma-separated list..." >
    </section>
      `,
  data() {
    return {
      newNote: { type: 'noteList', info: { title: null, list: null } },
    };
  },
  methods: {
    updateNote() {
      this.$emit('updateNote', this.newNote);
    },
  },
};
