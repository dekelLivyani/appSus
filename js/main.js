import appFooter from '../cmps/app-footer.js';
import appHeader from '../cmps/app-header.js';
import homePage from '../pages/home-page.js';
import { routes } from './routes.js';

const options = {
    el: '#app',
    routes,
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