import notePreview from './note-preview.js';

export default {
  props: ['notes'],
  template: `
        <ul class="notes-list">
            <note-preview v-for="note in notes" :key="note.id" :note="note" />
        </ul>
    `,
  components: {
    notePreview,
  },
};
