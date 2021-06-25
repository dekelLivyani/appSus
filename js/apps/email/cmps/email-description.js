export default {
    props: ['desc', 'isTextOpen'],
    template: `<section>
      <p>{{descToDisplay}}</p>
</section>
  `,
    computed: {
        descToDisplay() {
            if (this.desc.length < 130) return this.desc;
            if (!this.isTextOpen) return this.desc.substring(0, 130) + '...';
            else {
                if (this.desc.length < 600) return this.desc;
                else return this.desc.substring(0, 600) + '...';
            }
        },
    }
};