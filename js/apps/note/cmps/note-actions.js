import { eventBus } from '../../../services/event-bus-service.js';
import { noteService } from '../services/note-service.js';
import noteColorSelect from './note-color-select.js';

export default {
  props: ['propNote'],
  template: `
    <section v-if="note" class="note-actions">
        <button class="removeNote" @click.stop="removeNote" title="Delete">🗑</button>
        <button class="btn-color-change" @click.stop="toggleColorEdit" title="ChangeColor">
            🎨
            <note-color-select v-if="isEditingColor" @updateColor="updateColor"/>
        </button>
    </section>
    `,
  data() {
    return {
      note: null,
      isEditingColor: false,
    };
  },
  methods: {
    removeNote() {
      noteService.removeNote(this.note).then(() => {
        this.sendRenderNotes();
        this.$router.push('/note');
      });
    },
    toggleColorEdit() {
      this.isEditingColor = !this.isEditingColor;
    },
    sendRenderNotes() {
      eventBus.$emit('renderNotes');
    },
    updateColor(color) {
      this.$emit('updateColor', color);
    },
  },
  components: {
    noteColorSelect,
  },
  created() {
    noteService.cloneNote(this.propNote).then((note) => (this.note = note));
  },
};
