export default {
  props: ['note'],
  template: `
        <li class="note-cont">
            <router-link :to="noteURL" class="note-Preview">
                <p class="note-txt">
                    {{note.info.txt}}
                </p>
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
//       type: 'NoteTxt',
//       isPinned: false,
//       info: {
//         txt: noteTxt,
//       },
