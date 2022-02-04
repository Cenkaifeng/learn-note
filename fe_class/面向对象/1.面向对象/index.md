# 面向对象编程？

## 什么是面向对象编程？

面向对象是一种思想，经常被拿来和面向过程编程比较。

面向过程：关注的重点是动词，是分析出解决问题需要的步骤，编写对应的函数来实现每个步骤，依次调用函数。
面向对象：关注的重点是主谓，把构成问题的事物拆解为各个对象。目的不是为了实现某个具体的步骤，为了描述这个事物在当前问题中的各种行为。

面向对象的特点：

1. 封装：让使用对象的人不考虑内部实现，只考虑功能的使用。把内部的代码保护起来，只留出一些qpi供使用方使用。

2. 继承：为了代码复用，从父类上继承一些方法和属性，子类也有自己的一些属性

3. 多态：不同对象作用于同一操作产生了不同结果。多态的思想实际上是把”想做什么“和”谁去做“分开

比如下棋的过程。

面向过程编程思想中，
开局 -> 白方下棋 -> 棋盘展示 -> 检查胜负 -> 黑方下棋 -> 棋盘展示 -> 检查胜负 -> ...... 循环

init();
whitePlay();
repaint();
check();
blackPlay();
repaint();
check();


面向对象编程思想中，
棋盘对象，棋手，
棋盘.开局 -> 棋手.下棋 -> 棋盘.重新展示 -> 棋盘.检查胜负 -> 棋手.下棋 -> ......

```js
const checkerBoard = new CheckerBoard();
const whitePlayer = new Player('white');
const blackPlayer = new Player('black');

whitePlayer.start();// 最后emit() 一个事件

```

需求迭代，需要增加悔棋功能


### 在下棋的例子中，面向对象的特性是怎么体现出来的

1. 封装： Player, CheckerBoard都是封装，
2. 继承： whitePlayer, blackPlayer 都是继承于 Player
3. 多态： 不同对象作用于同一操作产生了不同结果。多态的思想实际上是把”想做什么“和”谁去做“分开
    1. 白方下棋产生白棋，黑方下棋产生黑棋。


### 什么时候适合使用面向对象的思想

在比较复杂的问题前面，或者说产预防较多的时候，可以很好的简化问题，能更好的扩展和维护。

在比较简单的问题面前，也可以一步步按照不走来调用。

## Js 中的面向对象

### 对象包含什么？

方法
属性

### Js中的内置对象

Object Array Date Function RegExp ...

### 创建对象
1. 普通方式

```js
const Player = new Object();
Player.color = 'white';
Player.start = function() {
    console.log('white下棋');
}

const Player = new Object();
Player.color = 'black';
Player.start = function() {
    console.log('black下棋');
}

```

工厂模式

缺点：无法正确识别出对象的类型，obj.constructor 打印不出[Function xxxx] 只能打出 object
```ts
function createObject(color: string, start: () => void) {
    const Player = new Object();
    Player.color = color;
    Player.start = start;
}

createObject('white');
createObject('black');
```

2. 构造函数

```js
function Player(color) {
    this.color = color;
    this.start = function() {

    };
}

const white = new Player('white');
const black = new Player('black');
```

缺点： this挂的属性/对象，都是指向当前对象的。所以在实例化的时候，通过this添加的属性或者方法，都会在内存中复制一份，会造成一定程度上的内存浪费。
优点：改变某个对象的属性和方法，不会影响到其他对象。

3. 原型
```js
function Player(color) {
    this.color = color;
}

Player.prototype.start = function() {};

const white = new Player('white');
const black = new Player('black');
```

优点：start方法只会在内存中存一份。

4. 静态属性

```js
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
```