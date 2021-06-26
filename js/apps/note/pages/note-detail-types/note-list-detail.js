import { utilService } from '../../../../services/util-service.js';

export default {
  props: ['note'],
  template: `
      <section v-if="newNote" class="note-details" :style="{ 'background-color': note.color }">
        <input type="text" class="note-title" @input="updateNote" v-model="newNote.info.title" placeholder="Add a title...">
        <input type="text" placeholder="Enter a todo..." v-model="newTodoTxt">
        <button type="button" class="btn-add-todo icon" @click="addTodo" title="Add todo"></button>
        <ul class="list-details">
          <div class="details-todo-cont" v-for="todo in note.info.list" :key="note.info.list.id">
            <li class="list-item" :class="{'isDone':todo.doneAt}"  @click.stop="done(todo)" title="Mark as done/undone">{{todo.txt}}</li>
            <button class="remove-todo icon" type="button" @click.stop="removeTodo(todo.id)" title="Remove todo">X</button>
          </div>
        </ul>

      </section>
      `,
  data() {
    return {
      newTodoTxt: null,
      newNote: { type: 'noteTxt', info: { title: null, list: null } },
    };
  },
  methods: {
    addTodo() {
      let todo = { id: utilService.makeId, txt: this.newTodoTxt, doneAt: null };
      this.newNote.info.list.push(todo);
      this.newTodoTxt = null;
    },
    removeTodo(id) {
      let list = this.newNote.info.list;
      console.log('list:', list);
      const idx = list.findIndex((todo) => todo.id === id);
      list.splice(idx, 1);
    },
    done(todo) {
      todo.doneAt ? (todo.doneAt = null) : (todo.doneAt = Date.now());
    },
    updateNote() {
      this.$emit('updateNote', this.newNote);
    },
  },
  computed: {},
  created() {
    this.newNote.info.title = this.note.info.title;
    this.newNote.info.list = this.note.info.list;
  },
};
