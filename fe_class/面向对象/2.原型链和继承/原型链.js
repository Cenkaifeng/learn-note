Object.prototype.xxx = 'Object'

function Player() {}

// Player.prototype.xxx = '12345';

const p1 = new Player();


console.log(p1.xxx);

// 由__proto__ 和prototype连接的链条，原型链