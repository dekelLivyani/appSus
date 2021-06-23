export default {
  props: ['note'],
  template: `
        <li class="note-preview-cont">
            <router-link :to="noteURL" class="note-preview">
                <h3 class="note-title">{{note.info.title}}</h3>
                <p class="note-txt">{{note.info.txt}}</p>
            </router-link>
        </li>       
    `,
  computed: {
    noteURL() {
      return `/note/${this.note.id}`;
    },
  },
};

// id: utilService.makeId(),
//       created: Date.now(),
//       lastEdited: Date.now(),
//       type: 'NoteTxt',
//       isPinned: false,
//       info: {
//         title: `Title ${i}`,
//         txt: noteTxt,
