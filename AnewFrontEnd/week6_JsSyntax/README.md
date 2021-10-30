## 关于面向对象



#### 一般来说对象必须有的属性

identifier: 唯一标识
state: 状态
behavior: 行为

> 所以任何一个对象都是唯一的，这与它本身的状态无关。
> 所以，即使状态完全一致的两个对象，也并不相等
> 我们用状态来描述对象
> 我们状态的改变即是行为。

最后对象就是唯一表示、状态和行为的三合一。 ———— Grady Booch


#### Class

Class Based Object Oriented

类作为面向对象最重要的方法论，是一种常见的描述对象的方式。
而“归类” 和“分类”则是两个主要的流派

对于“归类”方法而言，多机场是非常自然的事情，例如C++

而采用分类思想的计算机语言，则是单继承结构。并且会有一个基类Object


#### Prototype

原型是一种更接近人类原始认知的描述对象的方法。

我们并不试图做严谨的分类，而是采用“相似”这样的方式去描述对象

任何对象仅仅需要描述它自己与原型的区别即可


我们不应该受到自然语言描述的干扰。

在设计对象的状态行为时，我们总是遵循“行为改变状态”的原则

比如我要设计“狗咬人”这个类

```js
class Animal {
  constractor() {
  }
  bite() {
  }
}

class Human extends Animal {
  constractor(opt = {}) {
    this.name = opt.name || "name";
    this.age = opt.age || 0;
    this.sexual = opt.age || null;
  }
}

class Dog extends Animal {
  constructor(opt = {}) {
    this.opt = opt;
  }
}
```
上面就明显是受到自然语言叙事的顺序干扰。

如果我们从改变状态来出发
```js

class Animal {
  constractor() {
  }
  hurt() {
  }
  // get damage(){}

class Human extends Animal {
  constractor(opt = {}) {
    this.name = opt.name || "name";
    this.age = opt.age || 0;
    this.sexual = opt.age || null;
  }
}

class Dog extends Animal {
  constructor(opt = {}) {
    this.opt = opt;
  }
}
```


#### 个人理解

从我目前的理解来说，人类从3~4谁这个阶段开始对事物、对象开始有了概念，然后去寻找共性、归类归纳总结。这个过程的逆向在计算机科学里的表现。

fun1 fun1 抽象出共性，然后归纳成为一个具体的类。这个过程属于面向对象编程


推荐读物《面向对象分析与设计》