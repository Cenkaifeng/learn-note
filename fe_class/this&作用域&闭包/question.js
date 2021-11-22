//1.
// function foo() {
//     console.log(this.a)// console what : node:undefined window:2
// }

// var a = 2;

// (function() {
//     "use strict" // 迷惑点: 声明不在严格模式下
//     foo();
// })();

//2. 
var name = "the window"

var object = {
    name: "My Object",
    getName: function() {
        return this.name
    }
}

// object.getName() // console what? - My Object
(object.getName)()// console what -My Object
// (object.getName = object.getName)()// the window // 复制操作，会丢this
// (object.getName, object.getName)()// the window // 赋值、运算符 丢this

// 3. 

var x = 3
var obj3 = {
    x: 1,
    getX: function() {
        var x = 5
        return function() {
            return this.x
        }(); // ！立即执行表达式 IIFE 丢this
        
    }
}
console.log(obj3.getX()); // 3


// 4. 
function a(x) {
    this.x = x
    return this
}

var x = a(5) // 替换let 再试试
var y = a(6) // 替换 let 再试试 // 再换回var, 但是去掉y 的情况，再试试

// 等价于
// window.x = 5
// window.x = window

// window.x = 6
// window.y = window
console.log(x.x) 
console.log(y.x)

// 5

var a = 15, b = 15;

with( {a: 10} ) {
    var a = 30, b= 30;
    alert(a);
    alert(b);
}

alert(a);// ?
alert(b);// 30