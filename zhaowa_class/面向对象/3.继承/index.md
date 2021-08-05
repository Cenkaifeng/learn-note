# 继承

## 原型链继承

### 实现

```js

function Parent() {
    this.name = 'parentName';
}

Parent.prototype.getName = function() {
    return this.name
}

function Child() {}

// const child = new  Child()
// child.__proto__ === Child.prototype
// child.prototype.__proto__ === Parent.prototype
child.prototype = new Parent();
child.prototype.constructor = Child;// 类型矫正

const child1 = new Child();
console.log(child1.getName())
```

### 隐含问题

1. 如果有属性是引用类型，一旦某个实例修改了这个属性，所有的实例都受影响.
2. 创建Child实例的时候，无法传参。


## 构造函数继承

想办法吧Parents上的属性和方法，添加/复制到Child？而不是都存在原型对象/Parent上，防止被实例共享.


### 实现

```js

function Parent() {
    this.actions = ['eat', 'sleep'];
    this.name = 'parentName';
}
function Child() {
    Parent.call(this);// Child作用域调用Parent// 
    // this.actions = ['eat', 'sleep'];
    // this.name = 'parentName';
}

const c1 = new Child()
const c2 = new Child()
```

尝试解决第二个问题，如何传参？

```js

function Parent(name, actions) {
    this.actions = actions;
    this.name = name;
}
function Child(id, name, actions) {
    Parent.call(this, name, actions);
    this.id = id;
}

const c1 = new Child('c1', 'c1name', ['eat'])
const c2 = new Child('c2', 'c2name', ['play', 'jump'])

console.log(c1)
console.log(c2)
```

### 隐含的问题

1. 属性或者方法被继承的话，只能在构造函数中定义。如果方法在构造函数内定义了，那么每次创建都要创建一次（浪费内存）



## 组合继承
原型链继承，实现了基本的继承，方法存在prototype上，子类可以直接调用。但是引用类型的属性会被所有石磊共享。并且不能传参。
构造函数继承，首先解决了原型链继承的两个问题，带来了一个问题，构造函数内重复创建方法，导致内存占用过多。

### 实现

```js

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

// 组合

Child.prototype = new Parent();
Child.prototype.constructor = Child;

const c1 = new Child(1, 'c1', ['hahaha']);
const c2 = new Child(2, 'c2', ['xixixi']);

c1.eat()
c2.eat()
```

### 隐含问题

