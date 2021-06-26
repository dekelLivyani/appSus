import { utilService } from '../../../../services/util-service.js';
import { eventBus } from '../../../../services/event-bus-service.js';
export default {
  props: ['note'],
  template: `
      <section v-if="newNote" class="note-details" :style="{ 'background-color': note.color }">
        <img :src="note.info.url" alt="note.info.title" class="note-img-detail">
        <input type="text" v-model="newNote.info.title" @input="updateNote" class="note-title" placeholder="Title...">
        <input type="text" v-model="newURL" @input="verifyURL" class="note-add-txt" placeholder="Enter an different image URL..." >
      </section>
      `,
  data() {
    return {
      newNote: { type: 'noteImg', info: { title: null, url: null } },
      newURL: null,
    };
  },
  methods: {
    verifyURL() {
      if (this.newURL) {
        fetch(this.newURL, { method: 'HEAD' })
          .then((res) => {
            if (res.ok) {
              console.log('Image exists.');
              this.newNote.info.url = this.newURL;
              this.updateNote();
            } else {
              console.log('Image does not exist.');
              const msg = {
                txt: 'Image does not exist',
                type: 'error',
              };
              eventBus.$emit('show-msg', msg);
            }
          })
          .catch((err) => {
            console.log('Error:', err);
            const msg = {
              txt: 'Invalid or inaccessible image address',
              type: 'error',
            };
            eventBus.$emit('show-msg', msg);
          });
      }
    },
    updateNote() {
      this.$emit('updateNote', this.newNote);
    },
  },
  created() {
    this.newNote.info.title = this.note.info.title;
    this.newNote.info.txt = this.note.info.txt;
    this.verifyURL = utilService.debounce(this.verifyURL);
  },
};
