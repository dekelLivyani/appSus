import { eventBus } from '../../../services/event-bus-service.js';
import { noteService } from '../services/note-service.js';
import noteColorSelect from './note-color-select.js';

export default {
  props: ['note'],
  template: `
    <section class="note-actions">
        <button class="removeNote" @click.stop="removeNote" title="Delete">🗑</button>
        <button class="note-color" @click.stop="toggleColorEdit" title="ChangeColor">
            🎨
            <note-color-Select v-if="isEditingColor" @updateColor="updateColor" />
        </button>
    </section>
    `,
  data() {
    return {
      isEditingColor: false,
    };
  },
  methods: {
    removeNote() {
      noteService.removeNote(this.note).then(() => this.sendRenderNotes());
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
};
