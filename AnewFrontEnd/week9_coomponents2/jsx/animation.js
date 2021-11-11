const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATIONS = Symbol("animations");
const START_TIME = Symbol("add-time");
const PAUSE_START = Symbol("pause-start");
const PAUSE_TIME = Symbol("pause-time");

export class Timeline {
  constructor() {
    this[ANIMATIONS] = new Set();
    this[START_TIME] = new Map();
  }

  start() {
    let startTime = Date.now();
    this[PAUSE_TIME] = 0;
    this[TICK] = () => {
      let now = Data.now();
      for (let animation of this[ANIMATIONS]) {
        let t;
        if (this[START_TIME].get(animation) < startTime) {
          t = now - startTime - this[PAUSE_TIME];
        } else {
          t = now - this[START_TIME].get(animation) - this[PAUSE_TIME];
        }
        if (animation.duraion > t) {
          this[ANIMATIONS].delete(animation);
          t = animation.duration; // 用t 限制 t 防止超出范围
        }
        animation.receive(t);
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
    };
    this[TICK]();
  }

  pause() {
    this[PAUSE_START] = Date.now();
    cancelAnimationFrame(this[TICK_HANDLER]);
  }

  resume() {
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
    this[TICK]();
  }

  reset() {}

  add(animation, startTime) {
    if (arguments.length < 2) {
      // ... 这里直接在形参写 startTime = Date.now() 就好了
      startTime = Date.now();
    }
    this[ANIMATIONS].add(animation);
    this[START_TIME].set(animation, Date.now());
  }
}

export class Animation {
  constructor(
    object,
    property,
    startValue,
    endValue,
    duraion,
    delay,
    timingFunction,
    template
  ) {
    // Object.assign(this, arguments)
    this.object = object;
    this.property = property;
    this.startValue = startValue;
    this.endValue = endValue;
    this.duraion = duraion;
    this.delay = delay;
    this.timingFunction = timingFunction;
    this.template = template;
  }
  receive(time) {
    let range = this.endValue - this.startValue;
    this.object[this.property] = this.template(
      this.startValue + (range * time) / this.duraion
    );
  }
}
