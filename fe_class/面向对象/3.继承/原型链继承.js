
function Parent() {
    this.name = 'parentName';
    this.actions = ['eat', 'sleep'];
}

Parent.prototype.getName = function() {
    return this.name
}

function Child() {}

// const child = new  Child()
// child.__proto__ === Child.prototype
// child.prototype.__proto__ === Parent.prototype
Child.prototype = new Parent();
Child.prototype.constructor = Child;// 类型矫正

const c1 = new Child();
const c2 = new Child();

c1.actions.pop()

console.log(c1.actions);
console.log(c2.actions);

// const child1 = new Child();
// console.log(child1.getName())