import homePage from '../pages/home-page.js';
import emailApp from './apps/email/pages/email-app.js';
import emailDetail from './apps/email/pages/email-detail.js';
import noteApp from './apps/note/pages/note-app.js';
import noteDetail from './apps/note/pages/note-detail.js';

const routes = [{
        path: '/',
        component: homePage
    },
    {
        path: '/email',
        component: emailApp
    },
    {
        path: '/email/:emailId',
        component: emailDetail
    },
    {
        path: '/note',
        component: noteApp
    },
    {
        path: '/note/:noteId',
        component: noteDetail
    },
];

export const router = new VueRouter({ routes });