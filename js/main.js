import appFooter from '../js/cmps/app-footer.js';
import appHeader from '../js/cmps/app-header.js';
import homePage from '../js/pages/home-page.js';
import { router } from './routes.js';

const options = {
    el: '#app',
    router,
    template: `
    <section>
    <div class="wrapper">
    <app-header/>
    <router-view/>
   </div>
    <app-footer/>

    </section>
    `,
    components: {
        appFooter,
        appHeader,
        homePage
    }
}

const app = new Vue(options);