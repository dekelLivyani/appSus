import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const EMAIL_KEY = 'emails';
export const emailService = {
    query,
    addEmail,
    getById,
}

function query() {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            if (!emails.length) {
                var emailsToSave = emails = [{
                        id: utilService.makeId(),
                        subject: 'what sup?',
                        body: 'Fine, thanks',
                        to: 'Puki',
                        isRead: false,
                        sentAt: 1624443334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Hey all',
                        body: 'Hey for all my friends',
                        to: 'Shuki',
                        isRead: false,
                        sentAt: 1624349334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Surprise',
                        body: 'I got surprise',
                        to: 'Muki',
                        isRead: false,
                        sentAt: 1624248334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'What new?',
                        body: 'Really i don\'t know',
                        to: 'Amit',
                        isRead: false,
                        sentAt: 1624147334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Yes???',
                        body: 'Of corse!!!',
                        to: 'Puki',
                        isRead: false,
                        sentAt: 1624046334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'you love me??',
                        body: 'Sure, it\s a funny question!',
                        to: 'Stav',
                        isRead: false,
                        sentAt: 1619445334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'love?',
                        body: 'Love is in the air',
                        to: 'Puki',
                        isRead: false,
                        sentAt: 1618444334523
                    },
                ]
                return storageService.postMany(EMAIL_KEY, emailsToSave)
            } else return emails;
        })
}

function addEmail(newEmail) {
    return (storageService.post(EMAIL_KEY, newEmail))
}

function getById(id) {
    return storageService.get(EMAIL_KEY, id);
}