import { utilService } from '../../../services/util-service.js';

export const notesInitService = {
  getInitNotes,
};

const notesInit = _createInitNotes();

function getInitNotes() {
  return Promise.resolve(notesInit);
}

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
      info: {
        title: `Title ${i}`,
        txt: noteTxt,
      },
    });
  }
  return notes;
}
