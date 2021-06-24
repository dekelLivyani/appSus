export default {
    props: ['desc', 'isTextOpen'],
    template: `<section>
      <p>{{descToDisplay}}</p>
</section>
  `,
    computed: {
        descToDisplay() {
            if (this.desc.length < 145) return this.desc;
            if (!this.isTextOpen) return this.desc.substring(0, 145) + '...';
            else {
                if (this.desc.length < 800) return this.desc;
                else return this.desc.substring(0, 800) + '...';
            }
        },
    }
};