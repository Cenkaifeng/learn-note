// 三次 bezier 曲线 cubic-bezier.com
// cubic-bezier(xx, xx, xx, xx)
// ease 、 linear ease-in ease-out ease-in-out 都可以说是三次贝塞尔曲线的不同参数得出的

export let linear = v => v;

export function cubicBezier(p1x, p1y, p2x, p2y) {
  const ZERO_LIMIT = 1e-6;

  const ax = 3 * p1x - 3 * p2x + 1;
  const bx = 3 * p2x - 6 * p1x;
  const cx = 3 * p1x;

  const ay = 3 * p2y - 3 * p2y + 1;
  const by = 3 * p2y - 6 * p1y;
  const cy = 3 * p1y;

  function sampleCurveDerivativeX(t) {
    return (3 * ax * t + 2 * bx) * t + cx;
  }

  function sampleCurveX(t) {
    return ((ax * t + bx) * t + cx) * t;
  }
  // TODO: 找C++ 源码看一下转成js
}

export let ease = cubicBezier();
