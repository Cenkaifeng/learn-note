# 原型及原型链

## 在原型上添加属性或者方法有什么好处

```js
Player.prototype.xx1 = function () {};
Player.prototype.xx2 = function () {};
Player.prototype.xx3 = function () {};


Player.prototype = {
    xx1: function() {},
    xx2: function() {}
    ...
}// 问题：会覆盖原有的对象属性，怎么解决？

const originPrototype = Player.prototype
// Object.assign()
Player.prototye = {
    ...originProtype, 
    xxx1: function() {},
    xxx2: function() {}
}
```

## 怎么找到 Player 的原型对象

```js

function Player(color) {
    this.color = color;
} 

Player.prototype.start = function() {};

const white = new Player('white');
const black = new Player('black');
```


可以看一下 yy_prototype.png

## 那么 new 关键字做了什么就很明了了
 
1. 一个继承自Player.prototype 的新对象 p1/p1 被创建
2. p1.__proto__ === Player.prototype, p1.__proto__ 指向Player.prototype.
3. 将this指向新创建的对象p1/p2
4. 返回一个新对象
    1. 如果构造函数没有显式的返回值，那么返回this
    2. 如果构造函数有显式返回值，是基本类型， numer string boolean, 那么返回this.
    3. 如果构造函数有显式返回值，是对象类型，比如{a: 1}, 此时返回{a: 1}

## 原型链又是什么

当我们尝试读取原型链的属性时，如果找不到，会发生什么？

1. 查找原型上的属性
2. 去原型的原型上找
3. 找到顶层为止