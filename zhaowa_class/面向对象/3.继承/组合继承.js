
function Parent(name, actions) {
    this.name = name;
    this.actions = actions;
}

Parent.prototype.eat = function () {
    console.log(`${this.name} - eat`);
}

function Child(id) {
    Parent.apply(this, Array.from(arguments).slice(1));
    this.id = id;
}

// 组合原型链

Child.prototype = new Parent();
Child.prototype.constructor = Child;

const c1 = new Child(1, 'c1', ['hahaha']);
const c2 = new Child(2, 'c2', ['xixixi']);


c1.actions.pop()

console.log(c1)
console.log(c2)

// c1.eat()
// c2.eat()

// console.log(c1.eat === c2.eat)