import { storageService } from '../../../services/async-storage-service.js';
import { notesInitService } from './notes-init-service.js';

const NOTES_KEY = 'notes';
var gNotes = _getInitNotes();

export default {
  getNotes,
};

function getNotes() {
  return Promise.resolve(gNotes);
}

function _getInitNotes() {
  return notesInitService.getInitNotes().then((notes) => notes);
}
