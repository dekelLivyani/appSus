export default {
  template: `
   <section class="home-page">
   <img src="./img/home-page-hero.jpg" />
   <h1 class="title">The future of communication is here:</h1>
   <div class="homepage-nav">
      <div class="link"> <router-link class="link email-link" to="/email"></router-link> </div>
      <div class="link"> <router-link class="link note-link" to="/noteDyn"></router-link></div>
   </div>
</section>
`,
};
