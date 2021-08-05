
function Parent(name, actions) {
    this.actions = actions;
    this.name = name;
}
function Child(id) {
    Parent.apply(this, Array.prototype.slice.call(arguments, 1));
    this.id = id;
}

const c1 = new Child('c1', 'c1name', ['eat'])
const c2 = new Child('c2', 'c2name', ['play', 'jump'])

console.log(c1)
console.log(c2)