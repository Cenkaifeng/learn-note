export class Vue {
  constructor(options = {}) {
    this.$options = options;
    this.$el =
      typeof options.el === "string"
        ? document.querySelector(options.el)
        : options.el;
    this.$data = options.data;
    this.$methods = options.methods;
  }
}
