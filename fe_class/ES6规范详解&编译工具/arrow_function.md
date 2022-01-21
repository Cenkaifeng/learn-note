## arrow_function 箭头函数

```js
    //传统同属
    function sum(a, b) {
        return a + b;
    }

    // 传统函数表达式
    const sum1 = function (a, b) {
        return 1 + b;
    }

    sum(1, 1);
    sum1(1, 1);
```

### 箭头函数结构
```js
    // ES 6
    const sum2 = (a, b) => {
        return a + b
    }

    const sum3 = (a, b) => a + b;
    const sum4 = x => {
        // 逻辑
    };
```

### 上下文 - this
```js
const obj2 = {
    teacher: 'yy',
    leader: 'hxy',
    zhaowa: ['bubu', 'xiaoke'],
    getTeacher: function() {
        return this.teacher;
    },
    getLeader: () => {
        return this.leader;
    }
}
obj2.getTeacher(); // yy
obj2.getLeader();  // undefined
```

## 追问为何箭头函数无法get到对象属性 => this 、箭头函数没有独立上下文，只能用上一层的上下文

### 箭头函数上下文场景
#### 1. dom操作cb

```js
    // <button id="btn"><button>
    const btn = ducument.querySelector('#btn');
    btn.addEventListener('click', function() {
        this.style.width = '100%';
    })
```

#### 2. 类操作

```js
// 箭头函数无法构造类 （没有constructor）
function Obj(teacher, leader) {
    this.teacher = teacher;
    this.leader = leader;
}

const Obj = (teacher, leader) => {
    this.teacher = teacher;
    this.leader = leader;
}

const o1 = new Obj('yy', 'hxy');

// *追问： 箭头函数可否构造原型方法？ - 箭头函数无法构造原型上的方法(属性都没办法构造更没办法继承了)
Obj.prototype.course = function() {
    console.log(`${this.teacher}&${this.leader}`);
}
Obj.prototype.course2 = () => {
    console.log(`${this.teacher}&${thsi.leader}`)
}

```

### 箭头函数的参数 - 箭头函数没有arguments
```js
const sum = function (a, b) {
    console.log(arguments);
}

const sum1 = (a, b) => {
    console.log(arguments);
}
```

## 追问
### class 是什么类型？ - function
```js
console.log(typeof Course);
```

### class 是否有prototype? - 一致

```js
console.log(Course.prototype);
```

### *class可以使用对象方法&属性么？
```js
console.log(course.hasOwnProperty('teacher'))
```

### 属性定义 两种定义属性的方式： 构造器 & 顶层定义

```js
class Course {
    constructor(teacher ,course) {
        this._teacher =teacher;
        this.course = course;
    }
    getCourse() {
        return `teacher: ${this._teacher}, couse:
        ${this.course}`;
    }
    get teacher() {
        return this._teacher;
    }
    set teacher(val) {
        this._teacher = val;
    }
}

// 意义何在？
// 1. 建立只读变量， *js 如何建立只读变量
class Course2 {
    constructor(teacher ,course) {
        this._teacher =teacher;
        this.course = course;
    }
    getCourse() {
        return `teacher: ${this._teacher}, couse:
        ${this.course}`;
    }
    get tteacher() {
        return this._teacher;
    }
}
const course1 = new Course1('yy', 'es6');
course1.teacher = '222';
// 修改只读变量会报错么？ - 无法改变，但不会报错
```