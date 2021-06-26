import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const EMAIL_KEY = 'emails';
export const emailService = {
    query,
    addEmail,
    getById,
    removeEmail,
    updateEmail,
    getUser
}

function query() {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            if (!emails.length) {
                var emailsToSave = emails = [{
                        id: utilService.makeId(),
                        subject: 'How are you?',
                        body: `Fine, thanks...`,
                        from: getUser(),
                        to: 'Omri',
                        isRead: true,
                        isDraft: false,
                        isStar: true,
                        sentAt: 1624443334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: ' dolor sit amet',
                        body: ` possimus consectetur est earum delectus dolorum, nihil 
      dolore  explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
      porro quas explicabo blanditiis possimus consectetur est earum delectus dolorum, nihil 
      dolore aliquid maxime consequuntur. Quisquam`,
                        from: getUser(),
                        to: 'shon',
                        isRead: false,
                        isDraft: true,
                        isStar: false,
                        sentAt: 1624443334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Lorem ipsum dolor sit amet',
                        body: ` possimus consectetur est earum delectus dolorum, nihil 
                        dolore aliquid maxime consequuntur. Quisquam, amet consectetur adipisicing elit. Sed laborum nulla, 
                        porro quas explicabo Lorem ipsum
                        dolore aliquid maxime consequuntur. Quisquam, amet consectetur adipisicing elit. Sed laborum nulla, 
   porro quas explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
   dolore aliquid maxime consequuntur. Quisquam, amet consectetur adipisicing elit. Sed laborum nulla, 
   porro quas explicabo Lorem ipsum
   porro quas explicabo blanditiis possimus consectetur est earum delectus dolorum, nihil 
   dolore aliquid maxime consequuntur. Quisquam`,
                        from: getUser(),
                        to: 'Stav',
                        isRead: true,
                        isDraft: false,
                        isStar: false,
                        sentAt: 1624443334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Lorem ipsum dolor sit amet',
                        body: ` possimus consectetur est earum delectus dolorum, nihil 
dolore aliquid maxime consequuntur. Quisquam, amet consectetur adipisicing elit. Sed laborum nulla, 
porro quas explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
porro quas explicabo blanditiis possimus consectetur est earum delectus dolorum, nihil 
dolore aliquid maxime consequuntur. Quisquam`,
                        from: getUser(),
                        to: 'Timi',
                        isRead: false,
                        isDraft: true,
                        isStar: false,
                        sentAt: 1624443334523
                    }, {
                        id: utilService.makeId(),
                        subject: ' ipsum dolor ',
                        body: ` possimus consectetur est earum delectus dolorum, nihil 
                  dolore aliquid maxime consequuntur. Quisquam, amet consectetur adipisicing elit. Sed laborum nulla, 
                  porro quas explicabo Lorem ipsum
                  consequuntur. Quisquam, amet consectetur adipisicing elit. Sed laborum nulla, 
                  porro quas explicabo Lorem ipsum
                  consequuntur. Quisquam, amet consectetur adipisicing elit. Sed laborum nulla, 
                  porro quas explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
                  porro quas explicabo blanditiis possimus consectetur est earum delectus dolorum, nihil 
                  dolore aliquid maxime consequuntur. Quisquam`,
                        from: {
                            id: utilService.makeId(),
                            name: 'Timi',
                            lName: 'Sharon',
                            age: 17,
                            email: 'timiSharon3@gmail.com',
                        },
                        to: 'Omeri',
                        isRead: false,
                        isDraft: false,
                        isStar: false,
                        sentAt: 1624443334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Lorem dolor',
                        body: `  consectetur est earum delectus dolorum, nihil 
               dolore aliquid maxime consequuntur. Quisquam`,
                        from: {
                            id: utilService.makeId(),
                            name: 'Mirit',
                            lName: 'Halal',
                            age: 49,
                            email: 'Mirit1@gmail.com',
                        },
                        to: 'Sima',
                        isRead: false,
                        isDraft: true,
                        isStar: true,
                        sentAt: 1624443334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Lorem ipsum dolor sit amet',
                        body: ` possimus consectetur est earum delectus dolorum, nihil 
            dolore aliquid maxime consequuntur. Quisquam, amet consectetur adipisicing elit. Sed laborum nulla, 
            porro quas explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
            porro quas explicabo blanditiis possimus consectetur est earum delectus dolorum, nihil 
            dolore aliquid maxime consequuntur. Quisquam`,
                        from: getUser(),
                        to: 'shon',
                        isRead: false,
                        isDraft: false,
                        isStar: false,
                        sentAt: 1624443334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Are You Crazy? XD',
                        body: `maxime consequuntur possimus consectetur est earum delectus dolorum, nihil 
         dolore aliquid maxime consequuntur. Quisquam, amet consectetur adipisicing elit. Sed laborum nulla, 
         porro quas explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
         porro quas explicabo blanditiis possimus consectetur est earum delectus dolorum, nihil 
         dolore aliquid maxime consequuntur. Quisquam`,
                        from: {
                            id: utilService.makeId(),
                            name: 'Don',
                            lName: 'Kishot',
                            age: 55,
                            email: 'donKishot33@gmail.com',
                        },
                        to: 'Ali Baba',
                        isRead: false,
                        isDraft: false,
                        isStar: true,
                        sentAt: 1624443334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Lorem ipsum amet',
                        body: `blanditiis possimus  consequuntur. Quisquam, amet consectetur adipisicing elit. Sed laborum nulla, 
      porro quas explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
      porro quas explicabo consectetur est earum delectus dolorum, nihil 
      dolore aliquid maxime consequuntur. Quisquam`,
                        from: {
                            id: utilService.makeId(),
                            name: 'Shon',
                            lName: 'Halal',
                            age: 29,
                            email: 'shonshon1@gmail.com',
                        },
                        to: 'Dekel',
                        isRead: false,
                        isDraft: true,
                        isStar: false,
                        sentAt: 1624443334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Lorem ipsum dolor sit amet',
                        body: ` possimus consectetur est earum delectus dolorum, nihil 
               dolore aliquid maxime consequuntur. Quisquam, amet consectetur adipisicing elit. Sed laborum nulla, 
               porro quas explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
               porro quas explicabo blanditiis possimus consectetur est earum delectus dolorum, nihil 
               dolore aliquid maxime consequuntur. Quisquam`,
                        from: {
                            id: utilService.makeId(),
                            name: 'Shon',
                            lName: 'Halal',
                            age: 29,
                            email: 'shonshon1@gmail.com',
                        },
                        to: 'Sima',
                        isRead: false,
                        isDraft: true,
                        isStar: false,
                        sentAt: 1624443334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'what sup?',
                        body: `dolore aliquid maxime consequuntur. Quisquam, amet thanks amet consectetur adipisicing elit. Sed laborum nulla, 
                  porro quas explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
                  porro quas explicabo blanditiis possimus consectetur est earum delectus dolorum, nihil 
                  consectetur adipisicing elit. Sed laborum nulla, 
                  porro quas explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
                  porro quas explicabo blanditiis possimus consectetur est earum delectus dolorum, nihil 
                  dolore aliquid maxime consequuntur. Quisquam`,
                        from: getUser(),
                        to: 'Puki',
                        isRead: false,
                        isDraft: false,
                        isStar: true,
                        sentAt: 1624443334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'what sup?',
                        body: ` quas explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
                  porro quas explicabo blanditiis possimus consectetur est earum delectus dolorum, nihil 
                  dolore aliquid maxime consequuntur. Quisquam, amet consectetur adipisicing elit. Sed laborum nulla, 
                  porro quas explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
                  porro quas explicabo blanditiis possimus consectetur est earum delectus dolorum, nihil 
                  dolore aliquid maxime consequuntur. Quisquam`,
                        from: {
                            id: utilService.makeId(),
                            name: 'Omri',
                            lName: 'Timi',
                            age: 24,
                            email: 'Omri22@gmail.com',
                        },
                        to: 'Dekel',
                        isRead: true,
                        isDraft: false,
                        isStar: false,
                        sentAt: 1624443334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Lorem ipsum dolor sit amet',
                        body: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
                        porro quas explicabo blanditiis possimus consectetur est earum delectus dolorum, nihil 
                        dolore aliquid maxime consequuntur. Quisquam, amet consectetur adipisicing elit. Sed laborum nulla, 
                        porro quas Fine, thanks amet consectetur adipisicing elit. Sed laborum nulla, 
               porro quas explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
               porro quas explicabo blanditiis possimus consectetur est earum delectus dolorum, nihil 
               dolore aliquid maxime consequuntur. Quisquam, amet consectetur adipisicing elit. Sed laborum nulla, 
               porro quas explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
               porro quas explicabo blanditiis possimus consectetur est earum delectus dolorum, nihil 
               dolore aliquid maxime consequuntur. Quisquam`,
                        from: getUser(),
                        to: 'Stav',
                        isRead: false,
                        isDraft: true,
                        isStar: false,
                        sentAt: 1624443334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Lorem ipsum dolor sit amet',
                        body: `aliquid maxime consequuntur aliquid maxime consequuntur aliquid maxime consequunturFine, thanks amet consectetur adipisicing elit. Sed laborum nulla, 
                  porro quas explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
                  porro quas explicabo blanditiis possimus consectetur est earum delectus dolorum, nihil 
                  dolore aliquid maxime consequuntur. Quisquam, amet consectetur adipisicing elit. Sed laborum nulla, 
                  porro quas explicabo Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
                  porro quas explicabo blanditiis possimus consectetur est earum delectus dolorum, nihil 
                  dolore aliquid maxime consequuntur. Quisquam`,
                        from: {
                            id: utilService.makeId(),
                            name: 'Shimi',
                            lName: 'Tom',
                            age: 24,
                            email: 'Shimimi@gmail.com',
                        },
                        to: 'Puki',
                        isRead: true,
                        isDraft: true,
                        isStar: true,
                        sentAt: 1624443334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Hey all',
                        body: 'Hey for all my friends',
                        from: getUser(),
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
                        from: getUser(),
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
                        from: {
                            id: utilService.makeId(),
                            name: 'Shimi',
                            lName: 'Tom',
                            age: 24,
                            email: 'Shimimi@gmail.com',
                        },
                        to: 'Amit',
                        isRead: true,
                        isDraft: false,
                        isStar: false,
                        sentAt: 1624147334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Yes???',
                        body: 'Of corse!!!',
                        from: {
                            id: utilService.makeId(),
                            name: 'Omer',
                            lName: 'Tofi',
                            age: 31,
                            email: 'Omer2423@gmail.com',
                        },
                        to: 'Puki',
                        isRead: false,
                        isDraft: false,
                        isStar: true,
                        sentAt: 1624046334523
                    },
                    {
                        id: utilService.makeId(),
                        subject: 'Do you love me??',
                        body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laborum nulla, 
                        porro quas explicabo blanditiis possimus consectetur est earum delectus dolorum, nihil 
                        dolore aliquid maxime consequuntur. Quisquam, nobis nihil. Eum!`,

                        from: getUser(),
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
                        from: {
                            id: utilService.makeId(),
                            name: 'Stav',
                            lName: 'potlak',
                            age: 19,
                            email: 'stavistav@gmail.com',
                        },
                        to: 'Puki',
                        isRead: true,
                        isDraft: false,
                        isStar: true,
                        sentAt: 1618444334523
                    },
                ]
                return storageService.postMany(EMAIL_KEY, emailsToSave)
            } else return emails;
        })
}

function addEmail(newEmail) {
    if (!newEmail.from) newEmail.from = getUser();
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

function getUser() {
    let user = localStorage.getItem('User')
    if (user) return JSON.parse(user);
    user = {
        id: utilService.makeId(),
        name: 'Dekel',
        lName: 'Livyani',
        age: 24,
        email: 'Dekelliv0@gmail.com',
    }
    localStorage.setItem('User', JSON.stringify(user))
    return user;
}