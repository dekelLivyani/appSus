import notePreview from './note-preview.js';

export default {
  props: ['notes'],
  template: `
        <ul class="note-list">
            <note-preview v-for="note in notes" :key="note.id" :note="note" @click.native="noteClicked(note)"/>
            <h1 v-if="!notes" class="list-empty-state">No notes here</h1>
        </ul>
    `,
  methods: {
    noteClicked(note) {
      this.$router.push(`/note/${note.id}`);
    },
  },
  components: {
    notePreview,
  },
};
