import { eventBus } from '../../../../services/event-bus-service.js';
import { noteService } from '../../services/note-service.js';
import noteColorSelect from '../note-color-select.js';

export default {
  props: ['propNote'],
  template: `
    <section v-if="note" class="note-actions">
        <button class="btn-remove-note icon" @click.stop="removeNote" title="Delete"></button>
        <button class="btn-color-change icon" @click.stop="toggleColorEdit" title="ChangeColor">
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
        if (this.$route.path !== '/noteDyn') this.$router.push('/noteDyn');
        const msg = {
          txt: 'Note deleted!',
          type: 'error',
        };
        eventBus.$emit('show-msg', msg);
      });
    },
    toggleColorEdit() {
      this.isEditingColor = !this.isEditingColor;
    },
    updateColor(color) {
      this.$emit('updateColor', color);
    },
    sendRenderNotes() {
      eventBus.$emit('renderNotes');
    },
  },
  components: {
    noteColorSelect,
  },
  created() {
    noteService.cloneNote(this.propNote).then((note) => (this.note = note));
  },
};
