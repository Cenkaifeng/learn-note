setInterval(() => {}, 16);

let tick = () => {
  setTimeout(tick, 16);
};
