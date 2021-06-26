export default {
  template: `
    <section class="add-note-cont">
      <input type="text" v-model="newNote.info.url" @input="updateNote" class="note-add-txt" placeholder="Enter an image URL..." >
    </section>
      `,
  data() {
    return {
      newNote: { type: 'noteImg', info: { title: null, url: null } },
    };
  },
  methods: {
    updateNote() {
      this.$emit('updateNote', this.newNote);
    },
  },
};
