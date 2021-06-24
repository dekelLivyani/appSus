export default {
  template: `
        <section class="change-color-modal">
           <button class="color-option" title="White" :style="{ 'background-color': colorOpt1 }" @click.stop="updateColor(colorOpt1)"></button>
           <button class="color-option" title="Purple" :style="{ 'background-color': colorOpt2 }" @click.stop="updateColor(colorOpt2)"></button>
           <button class="color-option" title="Teal" :style="{ 'background-color': colorOpt3 }" @click.stop="updateColor(colorOpt3)"></button>
           <button class="color-option" title="Green" :style="{ 'background-color': colorOpt4 }" @click.stop="updateColor(colorOpt4)"></button>
           <button class="color-option" title="Grey" :style="{ 'background-color': colorOpt5 }" @click.stop="updateColor(colorOpt5)"></button>
           <button class="color-option" title="Orange" :style="{ 'background-color': colorOpt6 }" @click.stop="updateColor(colorOpt6)"></button>
        </section>
    `,
  data() {
    return {
      colorOpt1: 'whitesmoke',
      colorOpt2: '#D499B9',
      colorOpt3: '#DCE2AA',
      colorOpt4: '#8ED081',
      colorOpt5: '#B4D2BA',
      colorOpt6: '#EFBC9B',
    };
  },
  methods: {
    updateColor(color) {
      this.$emit('updateColor', color);
    },
  },
};
