// 1. 一个将继承自Player.prototype 的新对象 p1/p1 被创建
// 2. p1.__proto__ === Player.prototype, p1.__proto__ 指向Player.prototype.
// 3. 将this指向新创建的对象p1/p2
// 4. 返回一个新对象
//     1. 如果构造函数没有显式的返回值，那么返回this
//     2. 如果构造函数有显式返回值，是基本类型， numer string boolean, 那么返回this.
//     3. 如果构造函数有显式返回值，是对象类型，比如{a: 1}, 此时返回{a: 1}


function Player(name) {
    this.name = name;
    // return {a: 1}
}

function objectFactory() {
    // let o = new Object();// {};
    let o = Object.create(null);// {};
    let FunctionConstructor = [].shift.call(arguments);
    o.__proto__ = FunctionConstructor.prototype;

    let resultObj = FunctionConstructor.apply(o, arguments);//此时arguments ['lb']
    // 上面的写法注明一下， apply 本身调用后没有返回值，只会在o上调用构造函数的方法，arguments作为参数传入，
    //同时让resultObj 承接FunctionConstructor 的返回值
    console.log(resultObj)
    return typeof resultObj === 'object' ? resultObj : o;

}

const p1 = objectFactory(Player, 'lb')

console.log(p1);