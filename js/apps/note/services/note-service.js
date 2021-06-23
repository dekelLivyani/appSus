import { storageService } from '../../../services/async-storage-service.js';
import { utilService } from '../../../services/util-service.js';
import { notesInitService } from './notes-init-service.js';

const NOTES_KEY = 'notes';
const gNotes = _createNotes();

export const noteService = {
  query,
  getById,
  getPrevNoteId,
  getNextNoteId,
};

function query() {
  return storageService.query(NOTES_KEY);
}

function getById(id) {
  return storageService.get(NOTES_KEY, id);
}

function getPrevNoteId(id) {
  return query().then((notes) => {
    const idx = notes.findIndex((note) => note.id === id);
    return idx < 0 ? notes[notes.length - 1].id : notes[idx - 1].id;
  });
}

function getNextNoteId(id) {
  return query().then((notes) => {
    const idx = notes.findIndex((note) => note.id === id);
    return idx === notes.length - 1 ? notes[0].id : notes[idx + 1].id;
  });
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
