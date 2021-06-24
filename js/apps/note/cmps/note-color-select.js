export default {
  template: `
        <section class="edit-color-modal">
           <button class="color-option" :style="{ 'background-color': colorOpt1 }" @click.stop="updateColor(colorOpt1)"></button>
           <button class="color-option" :style="{ 'background-color': colorOpt2 }" @click.stop="updateColor(colorOpt2)"></button>
        </section>
    `,
  data() {
    return {
      colorOpt1: 'red',
      colorOpt2: 'blue',
    };
  },
  methods: {
    updateColor(color) {
      this.$emit('updateColor', color);
    },
  },
};
