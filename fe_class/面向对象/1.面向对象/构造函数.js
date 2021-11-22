function Player(color) {
    this.color = 'red'
    // this.start = function () {
    //     console.log(this.color);
    // }
}
Player.prototype.start = function () {
     console.log(this.color);
}
const p1 = new Player('1');
const p2 = new Player('2');

// console.log(p1.start === p2.start);
console.log(p1.constructor)