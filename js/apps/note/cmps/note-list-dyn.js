import noteTxt from './note-types/note-txt.js';

export default {
  props: ['notes'],
  template: `
        <ul class="note-list">
            <div v-for="note in notes" :key="note.id">
                <component :is="note.type" :propNote="note" @click.native="noteClicked(note)">
                </component>
            </div>
        </ul>
    `,
  methods: {
    noteClicked(note) {
      this.$router.push(`/noteDyn/${note.id}`);
    },
  },
  computed: {
    isNotes() {
      return this.notes || this.notes.length;
    },
  },
  components: {
    noteTxt,
  },
  created() {},
};

// id: 'KS0qjHo',
//     created: 1624612963984,
//     lastEdited: 1624612963984,
//     type: 'NoteTxt',
//     isPinned: false,
//     color: 'whitesmoke',
//     info: {
//       title: 'Call Mom',
//       txt: 'To say Happy Mothers day',
//     },
