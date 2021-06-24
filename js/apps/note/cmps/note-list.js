import notePreview from './note-preview.js';

export default {
  props: ['notes'],
  template: `
        <ul class="note-list">
            <note-preview v-if="isNotes" v-for="note in notes" :key="note.id" :propNote="note" @click.native="noteClicked(note)"/>
        </ul>
    `,
  methods: {
    noteClicked(note) {
      this.$router.push(`/note/${note.id}`);
    },
  },
  computed: {
    isNotes() {
      return this.notes || this.notes.length;
    },
  },
  components: {
    notePreview,
  },
};
