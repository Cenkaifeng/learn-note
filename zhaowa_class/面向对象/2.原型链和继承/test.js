function Player(color) {
    this.color = color;
    // return 1;
    return {a: 1};
}

// Player.prototype.start = function() {};

const white = new Player('white');
// const black = new Player('black');

// console.log(black.__proto__); // Player {}; 原型对象
// console.log(Object.getPrototypeOf(black));
// console.log(Player.prototype)
// console.log(Player.__proto__)

console.log(white);