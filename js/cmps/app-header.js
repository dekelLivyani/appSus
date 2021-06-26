export default {
    template: `
      <section class="app-header">
            <img src="./img/logos/main-logo.png" class="logo-main">
          <button class="menu-btn" @click="toggleMenu">
             <img src="./img/menu.png" />
          </button>
          <nav class="nav" :class="classToNav">
          <div @click="toggleMenu"><router-link class="home-page-link" to="/"></router-link> </div>
          <div @click="toggleMenu"> <router-link class="email-link" to="/email"></router-link> </div>
          <div @click="toggleMenu"> <router-link class="note-link" to="/note"></router-link></div>
          <div @click="toggleMenu"> <router-link class="note-link" to="/noteDyn"></router-link></div>
          </nav>
      </section>
      `,
    data() {
        return {
            menuOpen: false,
        };
    },
    methods: {
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
        },
    },
    computed: {
        classToNav() {
            return { 'open-nav': this.menuOpen };
        },
    },
};