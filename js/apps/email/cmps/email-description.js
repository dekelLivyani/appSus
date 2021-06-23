export default {
    props: ['desc', 'isTextOpen'],
    template: `<section>
      <p>{{descToDisplay}}</p>
</section>
  `,
    computed: {
        descToDisplay() {
            if (!this.isTextOpen) return this.desc.substring(0, 155) + '...';
            else {
                if (this.desc.length < 800) return this.desc;
                else return this.desc.substring(0, 800) + '...';
            }
        },
    }
};