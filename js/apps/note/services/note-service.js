import { storageService } from '../../../services/async-storage-service.js';
import { utilService } from '../../../services/util-service.js';
import { notesInitService } from './notes-init-service.js';

const NOTES_KEY = 'notes';
const gNotes = _createNotes();

export const noteService = {
  query,
};

function query() {
  return storageService.query(NOTES_KEY);
}

function _createNotes() {
  let notes = utilService.load(NOTES_KEY);
  if (!notes || !notes.length) {
    notes = _getInitNotes().then((notes) => {
      utilService.save(NOTES_KEY, notes);
      return notes;
    });
  }
  return notes;
}

function _getInitNotes() {
  return notesInitService.getInitNotes().then((notes) => notes);
}
