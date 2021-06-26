import { eventBus } from '../../../../services/event-bus-service.js';
import { noteService } from '../../services/note-service.js';
import noteActionsDyn from '../note-actions-dyn/note-actions-dyn.js';
import notePin from '../note-pin.js';

export default {
  props: ['propNote'],
  template: `
    <li v-if="note" class="note-preview-cont" title="Edit the note" :style="{ 'background-color': note.color }">
        <h3 class="note-title">{{note.info.title}}</h3>
        <ul class="list">
          <li class="list-item" :class="{'isDone':todo.doneAt}" v-for="todo in note.info.list" :key="note.info.list.id" @click.stop="done(todo)">{{todo.txt}}</li>
        </ul>
        <note-pin :propNote="note"/>
        <div class="bottom-preview-bar">
          <div class="note-icon list" title="Text note"></div>
          <note-actions-dyn :propNote="note" @updateColor="renderColor"/>
        </div>
    </li>       
    `,
  data() {
    return {
      note: null,
    };
  },
  methods: {
    done(todo) {
      todo.doneAt ? (todo.doneAt = null) : (todo.doneAt = Date.now());
    },
    pinNoteToggle() {
      this.note.isPinned = !this.note.isPinned;
      this.updateNotes();
    },
    updateNotes() {
      noteService.updateNote(this.note).then(() => eventBus.$emit('renderNotes'));
    },
    renderColor(color) {
      this.note.color = color;
      this.updateNotes();
    },
  },
  created() {
    noteService.cloneNote(this.propNote).then((note) => (this.note = note));
  },
  components: {
    noteActionsDyn,
    notePin,
  },
};
// {
//   id: 'asdfo897',
//   created: 1624612963984,
//   lastEdited: 1624612963984,
//   type: 'noteList',
//   color: 'lightyellow',
//   info: {
//     title: 'How was it:',
//     list: [
//       { id: utilService.makeId(), txt: 'Do that', doneAt: null },
//       { id: utilService.makeId(), txt: 'Do this', doneAt: 187111111 },
//     ],
//   },
// },
