import { router } from './router.js';
import bookFooter from '../cmps/app-footer.js';
import bookHeader from '../pages/app-header.js';
import homePage from '../pages/home-page.js';

const options = {
    el: '#app',
    router,
    template: `
    <section>
    <app-header/>
    <router-view/>
    <app-footer/>

    </section>
    `,
    components: {
        bookFooter,
        bookHeader,
        homePage
    }
}

const app = new Vue(options);