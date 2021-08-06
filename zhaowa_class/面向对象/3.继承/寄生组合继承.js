
function Parent(name, actions) {
    this.name = name;
    this.actions = actions;
}

Parent.prototype.eat = function () {
    console.log(`${this.name} - eat`);
}

function Child(id) {
    Parent.apply(this, Array.from(arguments).slice(1)); // 1次
    this.id = id;
}


// Child.prototype = new Parent(); 
// let TempFunction = function() {};
// TempFunction.prototype = Parent.prototype;
// Cild.prototype = new TempFunction(); // TempFunction 作为中间函数转移继承实例属性

// Child.prototype = Object.create(Parent.prototype);// 上面三行模拟实行了Object.create();

Child.prototype = Parent.prototype;
Child.prototype.constructor = Child;


console.log(Parent.prototype);

Child.prototype.childEat = function() {};

console.log(Parent.prototype);
// const c1 = new Child(1, 'c1', ['hahaha']);
// const c2 = new Child(2, 'c2', ['xixixi']);

// c1.eat()
// c2.eat()