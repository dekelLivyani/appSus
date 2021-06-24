export default {
  template: `
      <section class="app-header">
          <div class="logo">
            <img src="./img/logos/main-logo.png" class="logo-main">
            <h1 class="page-title"></h1>
          </div>
          <div class="nav">
            <router-link to="/">Homepage</router-link> |
            <router-link to="/email">Email</router-link> |
            <router-link to="/note">Note</router-link>
          </div>
      </section>
      `,
};
