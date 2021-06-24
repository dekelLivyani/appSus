import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const EMAIL_KEY = 'emails';
export const emailService = {
    query,
    addEmail,
    getById,
    removeEmail,
    updateEmail,
}

function query() {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            if (!emails.length) {
                var emailsToSave = emails = [{
                        id: utilService.makeId(),
                        subject: 'what sup?',
                        body: `Fine, thanks amet consectetur adipisicing elit. Sed laborum nulla, 
                        porro quas explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
                        porro quas explicabo blanditiis possimus consectetur est earum delectus dolorum, nihil 
                        dolore aliquid maxime consequuntur. Quisquam, amet consectetur adipisicing elit. Sed laborum nulla, 
                        porro quas explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
                        porro quas explicabo blanditiis possimus consectetur est earum delectus dolorum, nihil 
                        dolore aliquid maxime consequuntur. Quisquam`,
                        from: 'Muki',
                        to: 'Puki',
                        isRead: false,
                        isDraft: false,
                        isStar: false,
                        sentAt: 1624443334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Hey all',
                        body: 'Hey for all my friends',
                        from: 'Muki',
                        to: 'Shuki',
                        isRead: false,
                        isDraft: false,
                        isStar: false,
                        sentAt: 1624349334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Surprise',
                        body: `I got surprise amet consectetur adipisicing elit. Sed laborum nulla, 
                        porro quas explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
                        porro quas explicabo blanditiis possimus consectetur est earum delectus dolorum, nihil 
                        dolore aliquid maxime consequuntur. Quisquam`,
                        from: 'Dekel',
                        to: 'Muki',
                        isRead: false,
                        isDraft: false,
                        isStar: false,
                        sentAt: 1624248334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'What new?',
                        body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
                        porro quas explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
                        porro quas explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
                        porro quas explicabo blanditiis possimus consectetur est earum delectus dolorum, nihil 
                        dolore aliquid maxime consequuntur. Quisquam, nobis nihil. Eum! blanditiis possimus consectetur est earum delectus dolorum, nihil 
                        dolore aliquid maxime consequuntur. Quisquam, nobis nihil. Eum! blanditiis possimus consectetur est earum delectus dolorum, nihil 
                        dolore aliquid maxime consequuntur. Quisquam, nobis nihil. Eum!`,
                        from: 'Stav',
                        to: 'Amit',
                        isRead: false,
                        isDraft: false,
                        isStar: false,
                        sentAt: 1624147334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Yes???',
                        body: 'Of corse!!!',
                        from: 'Dekel',
                        to: 'Puki',
                        isRead: false,
                        isDraft: false,
                        isStar: false,
                        sentAt: 1624046334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Do you love me??',
                        body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
                        porro quas explicabo blanditiis possimus consectetur est earum delectus dolorum, nihil 
                        dolore aliquid maxime consequuntur. Quisquam, nobis nihil. Eum!`,
                        from: 'Omer',
                        to: 'Stav',
                        isRead: false,
                        isDraft: false,
                        isStar: false,
                        sentAt: 1619445334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'love?',
                        body: 'Love is in the air',
                        from: 'Dekel',
                        to: 'Puki',
                        isRead: false,
                        isDraft: false,
                        isStar: false,
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

function removeEmail(id) {
    return storageService.remove(EMAIL_KEY, id);
}

function updateEmail(email) {
    return storageService.put(EMAIL_KEY, email);
}