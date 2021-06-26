import { utilService } from '../../../../services/util-service.js';
import { eventBus } from '../../../../services/event-bus-service.js';
export default {
  props: ['note'],
  template: `
      <section v-if="newNote" class="note-details" :style="{ 'background-color': note.color }">
        <div class="img-cont">
          <button class="deleteImg icon" v-if="newNote.info.url" title="Delete image" type="button" @click="deleteImg"></button>
          <img :src="newNote.info.url" v-if="newNote.info.url" alt="note.info.title" class="note-img-detail">
        </div>
        <input type="text" v-model="newNote.info.title" @input="updateNote" class="note-title" placeholder="Title...">
        <input type="text" v-model="newURL" @input="verifyURL" class="note-add-txt" placeholder="Enter an image URL..." >
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
      console.log('this.newNote:', this.newNote);
      this.$emit('updateNote', this.newNote);
    },
    deleteImg() {
      this.newNote.info.url = '';
      this.updateNote();
      console.log('this.newNote.info.url:', this.newNote.info.url);
    },
  },
  created() {
    this.newNote.info.title = this.note.info.title;
    this.newNote.info.url = this.note.info.url;
    this.verifyURL = utilService.debounce(this.verifyURL);
  },
};
