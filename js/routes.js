import homePage from '../js/pages/home-page.js';
import emailApp from './apps/email/pages/email-app.js';
import emailDetail from './apps/email/pages/email-detail.js';
import noteApp from './apps/note/pages/note-app.js';
import noteDetail from './apps/note/pages/note-detail.js';
import noteAppDyn from './apps/note/pages/note-app-dyn.js';
import noteDetailDyn from './apps/note/pages/note-detail-dyn.js';

const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/email',
    component: emailApp,
  },
  {
    path: '/email/:emailId',
    component: emailDetail,
  },
  {
    path: '/note',
    component: noteApp,
  },
  {
    path: '/note/:noteId',
    component: noteDetail,
  },
  {
    path: '/noteDyn',
    component: noteAppDyn,
  },
  {
    path: '/noteDyn/:noteId',
    component: noteDetailDyn,
  },
];

export const router = new VueRouter({ routes });
