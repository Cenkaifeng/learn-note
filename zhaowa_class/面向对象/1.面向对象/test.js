function Player(color) {
    this.color = color;
    if (!Player.total) {
        Player.total = 0;
    }
    Player.total++;
}
const white = new Player('white');
console.log(Player.total);
const black = new Player('black');
console.log(Player.total);