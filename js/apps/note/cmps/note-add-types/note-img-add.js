export default {
  template: `
    <section>
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

// test img
// https://static01.nyt.com/images/2021/01/19/science/09TB-PLATYPUS/09TB-PLATYPUS-superJumbo.jpg
