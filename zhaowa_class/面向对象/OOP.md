### 对象是什么？我们为什么要面向对象？
#### 特点：面向对象（OOP) :逻辑迁移灵活、代码可复用性高、高度模块化

***
#### 对象的理解

* 对象是对于单个物体的简单抽象
* 对象时一个容器，封装了属性&方法
** 属性： 对象的状态
** 方法： 对象的行为

```js
    // 简单对象
    const Course = {
        treacher: 'yy',
        leader: 'hxy',
        startCourse: function(name) {
            return `开始${name}课`;
        }
    }


    // js 通常使用的是函数对象
    function Course() {
        this.treacher: 'yy';
        this.leader: 'hxy';
        this.startCourse = function(name) {
            return `开始${name}课`;
        }        
    }
```

***
## 构造函数 - 生成对象
### 需要一个模板 - 表征了一类物体的共同特征，从而生成对象
#### 类即对象模板
#### js其实本质上不是基于类，而是基于构造函数 + 原型链
#### constructor+ prototype

```js
     function Course() {
        this.teacher: 'yy';
        this.leader: 'hxy';
    }   

    const course = new Course();
```

#### Course 本质就是构造函数
* 1. 函数体内使用的this,代表所要生成的实例
* 2. 生成对象通过new来实例化
* 3. 可以做初始化传参


#### 追问：
#### 构造函数，不初始化，可以使用么？ - 无法使用

#### 如果需要使用，如何做兼容
```js
    function Course() {
        const _isClass = this instanceof Course;
        if( !_isClass ) {
            return new Course();
        }
        this.teacher: 'yy';
        this.leader: 'hxy';
    }   

    const course = new Course();   
```

***
#### 引发思考： new是什么 / new 的原理 / new 做了什么？
```js
    function Course() {}
    const course = new Course();
```
* 1. 创建了一个空对象，作为返回的对象实例
* 2. 将生成的空对象的原型对象指向了构造函数的prototype属性
* 3. 将当前实例对象赋给了内部this
* 4. 执行构造函数初始化代码

### 追问： 实例属性影响

```js

    function Course(teacher, leader) {
        this.teacher: teacher;
        this.leader: leader;
    }  
    const course1 = new Course('yy','hxy');   
    const course2 = new Course('yy2','hxy2');   

    course2.leader = 'xx'
    //问 course1属性会不会变

```

### constructor 是什么

```js
    function Course(teacher, leader) {
        this.teacher: teacher;
        this.leader: leader;
    } 
    const course1 = new Course('yy','hxy');   
    
```

* 1. 每个对象创建时会自动拥有一个构造函数属性constructor
* 2. constructo继承自原型对象，指向构造函数的引用

#### 追问：使用构造函数没有问题么？ 会有什么性能问题？(考点：通用行为的生成)

```js
    function Course(name) {
        this.teacher: 'yy';
        this.leader: 'hxy';
        this.startCourse = function(name) {
            return `开始${name}课`;
        }        
    }
    const course1 = new Course('es6');   
    const course2 = new Course('oop');   
    // 构造函数中的方法，会存在于每个生成的实例中，重复挂载会导致资源浪费
```

#### 原型对象
```js
    function Course() {}
    const course1 = new Course();   
    const course2 = new Course();  
```

* 1. 构造函数： 用来初始化创建对象的函数 — Course
** 自动给构造函数赋予一个prototype属性，该属性实际等于实际对象的原型对象（`__proto__`)

* 2. 实例对象: course1就是实例对象，根据原型创建出来的实例
** 每个对象中都有\_\_proto__属性
** 每个实例对象都有个constructor
** constructor由继承而来，并指向当前构造函数

* 3. 原型对象： Course.prototype
***
```js
    function Course() {}
    Course.prototype.teacher = 'yy';
    const course1 = new Course();   
    const course2 = new Course();  

    // 对上篇原型对象优化
    function Course() {
        this.teacher: 'yy';
        this.leader: 'hxy';
        // this.startCourse = function(name) {
        //     return `开始${name}课`;
        // }        
    }
    Course.prototype.startCourse = function(name) {
            return `开始${name}课`;
    }  
    const course1 = new Course('es6');   
    const course2 = new Course('oop');  

```
***
## 继承（狭义）
#### 在源相对相对所有属性和方法都能被实例所共享
```js
    //Game 类
    function Game() {
        this.name = 'lol';
    }

    Game.prototype.getName = function() {
        return this.name;
    }

    //LOL 类

    function LOL(){}
    // LOL 继承 Game类
    LOL.prototype = new Game();// 父类实例挂载
    LOL.prototype.constructor = LOL;
    const game = new LOL();

    // 本质：重写原型对象，将父对象的属性方法，作为子对象原型对象属性方法。
    
```

#### 追问：原型链继承有什么缺点？
```js
    //Game 类
    function Game() {
        this.name = 'lol';
        this.skin = ['s'];
    }

    Game.prototype.getName = function() {
        return this.name;
    }

    //LOL 类

    function LOL(){}
    // LOL 继承 Game类
    LOL.prototype = new Game();// 父类实例挂载
    LOL.prototype.constructor = LOL;
    const game1 = new LOL();
    const game2 = new LOL();

    game1.skin.push('ss')
```

* 1. 父类属性一旦赋值给子类的原型属性，此时属性属于子类的共享属性了
* 2. 实例化子类时，不能向父类传参


### 解决方案：构造函数继承
#### 经典继承： 在子类构造函数内调用父类构造函数
```js
    //Game 类
    function Game(arg) {
        this.name = 'lol';
        this.skin = ['s'];
    }

    Game.prototype.getName = function() {
        return this.name;
    }

    //LOL 类

    function LOL(arg){
        Game.call(this, arg);
    }
    // LOL 继承 Game类
    const game3 = new LOL();
    // 解决了共享属性问题&传参问题
```

#### 追问：原型链上的共享方法无法被读取继承，如何解决？
#### 解决方案： 组合继承（把上面两种结合）
```js
    //Game 类
    function Game(arg) {
        this.name = 'lol';
        this.skin = ['s'];
    }

    Game.prototype.getName = function() {
        return this.name;
    }

    //LOL 类

    function LOL(arg){
        Game.call(this, arg);
    }
    LOL.prototype = new Game();// 父类实例挂载
    LOL.prototype.constructor = LOL;
    // LOL 继承 Game类
    const game3 = new LOL();
```

#### 追问：组合继承就没有缺点么？问题在于：无论何种场景，都会调用两次父类构造函数。

* 1. 初始化子类原型时
* 2. 子类够着函数内部call父类的时候

### 解决方案：寄生组合继承
```js
    //Game 类
    function Game(arg) {
        this.name = 'lol';
        this.skin = ['s'];
    }

    Game.prototype.getName = function() {
        return this.name;
    }

    //LOL 类

    function LOL(arg){
        Game.call(this, arg);
    }
    LOL.prototype = Object.create(Game.prototype);
    LOL.prototype.constructor = LOL;
    // LOL 继承 Game类
    const game3 = new LOL();
```

#### 提高：看起来完美解决了继承？js如何实现多重继承？

```js
    //Game 类
    function Game(arg) {
        this.name = 'lol';
        this.skin = ['s'];
    }

    Game.prototype.getName = function() {
        return this.name;
    }
    function Store() {
        this.shop = 'steam';
    }

    Store.prototype.getPlatform = function() {
        return this.shop;
    }
    //LOL 类

    function LOL(arg){
        Game.call(this, arg);
        Store.call(this, arg);
    }
    LOL.prototype = Object.create(Game.prototype);
    // LOL.prototype = Object.create(Store.prototype);
    Object.assign(LOL.prototype, Store.prototype)
    LOL.prototype.constructor = LOL;

    // LOL 继承 Game类
    const game3 = new LOL();
```