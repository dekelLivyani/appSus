export default {
    props: ['desc', 'isTextOpen'],
    template: `<section class="email-description">
      <p class="txt-body" :class="classOpen" >{{descToDisplay}}</p>
</section>
  `,
    computed: {
        descToDisplay() {
            if (this.desc.length < 130) return this.desc;
            if (!this.isTextOpen) return this.desc.substring(0, 130) + '...';
            else {
                if (this.desc.length < 400) return this.desc;
                else return this.desc.substring(0, 400) + '...';
            }
        },
        classOpen() {
            return { 'is-open': this.isTextOpen }
        }
    }
};