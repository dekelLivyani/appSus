export default {
    props: ['desc', 'isTextOpen'],
    template: `<section>
      <p>{{descToDisplay}}</p>
</section>
  `,
    computed: {
        descToDisplay() {
            if (this.desc.length < 150) return this.desc;
            if (!this.isTextOpen) return this.desc.substring(0, 150) + '...';
            else {
                if (this.desc.length < 600) return this.desc;
                else return this.desc.substring(0, 600) + '...';
            }
        },
    }
};