import { utilService } from '../../../services/util-service.js';

export const notesInitService = {
  getInitNotes,
};

function getInitNotes() {
  return Promise.resolve(notesInitNew);
}

const notesInitOld = _createInitNotes();

const notesInitNew = [
  {
    id: 'gsfd234T',
    created: 1624612963984,
    lastEdited: 1624612963984,
    type: 'noteImg',
    color: 'lightgreen',
    info: {
      title: 'Agent P',
      url: 'https://static01.nyt.com/images/2021/01/19/science/09TB-PLATYPUS/09TB-PLATYPUS-superJumbo.jpg',
    },
  },
  {
    id: 'asdfo897',
    created: 1624612963984,
    lastEdited: 1624612963984,
    type: 'noteList',
    color: 'lightyellow',
    info: {
      title: 'How was it:',
      list: [
        { id: utilService.makeId(), txt: 'Do that', doneAt: null },
        { id: utilService.makeId(), txt: 'Do this', doneAt: 187111111 },
      ],
    },
  },
  {
    id: 'KS0qjHo',
    created: 1624612963984,
    lastEdited: 1624612963984,
    type: 'noteTxt',
    isPinned: false,
    color: 'whitesmoke',
    info: {
      title: 'Call Mom',
      txt: 'To say Happy Mothers day',
    },
  },
  {
    id: 'pjert92nf',
    created: 1624612963984,
    lastEdited: 1624612963984,
    type: 'noteImg',
    color: 'lightskyblue',
    info: {
      title: 'A mans best friend',
      url: 'https://cdn.buttercms.com/ZF8K2t8hT8OoNR3W42bX',
    },
  },
  {
    id: 'ZmSIAAg',
    created: 1624612963984,
    lastEdited: 1624612963984,
    type: 'noteTxt',
    isPinned: false,
    color: '#D499B9',
    info: {
      title: 'Sign up for a marathon run',
      txt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, non sit deserunt quos voluptate inventore est saepe molestiae similique suscipit',
    },
  },
  {
    id: '0t5pxVZ',
    created: 1624612963984,
    lastEdited: 1624612963984,
    type: 'noteTxt',
    isPinned: false,
    color: '#DCE2AA',
    info: {
      title: 'Sign up for the gym',
      txt: 'Maybe next week?',
    },
  },
];

function _createInitNotes(num = 10) {
  let notes = [];
  for (let i = 0; i < num; i++) {
    let noteTxt = Math.random() > 0.5 ? `Note #${i}  short` : `Note  #${i} long Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, non sit deserunt quos voluptate inventore est saepe molestiae similique suscipit`;
    notes.push({
      id: utilService.makeId(),
      created: Date.now(),
      lastEdited: Date.now(),
      type: 'NoteTxt',
      isPinned: false,
      color: 'whitesmoke',
      info: {
        title: `Title ${i}`,
        txt: noteTxt,
      },
    });
  }
  return notes;
}
