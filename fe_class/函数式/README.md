# 函数式

## 一、函数式编程的出现

* 发展历程：命令式（脚本）式 => 面向对象 => 函数式

### 1. 问题的出现 - 从一道基础面试题开始说起

```js
    // 面试题：上接浏览器原理 - 参数parse
    // 1. 数组在 url 中展示形式
    // location.search => '?name[]=progressive$%coding&name[]=objective$&%coding&name[]=functional$%coding'
    // 2. 参数提取并且拼接成数组
    // ['progressive$%coding', 'objective$%coding', 'functional$%coding']
    // 3. 转换成对象
    // [  {name: 'progressive coding'},
    //     {name: 'objective coding'},
    //     {name: 'functional coding'}]

const _array =['progressive$%coding', 'objective$%coding', 'functional$%coding'];
const _objArr = [] ;

const nameParser = (array, objArr) => {
    array.forEach(item => {
        let names = item.split('$%')
        let newName = []
        names.forEach(name => {
            let nameItem = name[0].toUpperCase() + name.slice(1);

            newName.push(nameItem)
        })
    })
    return objArr
}
// 问题：这段代码最大问题
// 1. 包裹逻辑 - 看完整段才知道在做啥
// 2. 存在临时变量，并收尾封闭 - 拓展难度高，影响范围大
```

### 解决方案

```js
// step1. 需求分析: 本质上是数据结构的转换。
//    数组 > 数组对象 => [字符串 > 对象]
// nameParser => [objHelper :: string > object]

// step2: 功能明确 => objHelper = formatName + assembleObj

// step3: 功能拆分 => objHelper = [(split + capitalize + join)] + assembleObj

// step4 代码实现
const _array =['progressive$%coding', 'objective$%coding', 'functional$%coding'];
const _objArr = [] ;

// 原子操作实现

const assembleObj = (key, x) =>{
    let obj = {};
    obj[key] = x;
    return obj
}

const capitalize = str => str[0].toUpperCase() + str.slice(1);

// 声明结构
const formatName = 组装(join(' '), map(capitalize), split('$%'))

const objHelper = 组装(assembleObj('name'), formatName);

const nameParser = map(objHelper);

nameParser(_array);

// 面试题: 正确的遍历 - for forEach map filter sort
// 本质 => 通用遍历 | 遍历逻辑处理 | m生成数组 - 处理 | filter - 过滤 | sort - 排序 | 
// 尽可能用api 时让它自闭环，无副作用 
```

## 二、函数式编程的原理特点

### 1. 什么是函数式原理（代数效应）

* 加法结合律 | 因式分解 | 完全平方公式 => 原子组合进行变化 a + b + c = (a + b) + c

* 需求 => 组合（拼接 走线） => 出水口

### 2. 理论思想

* a 函数式一等公民 1. 实际功能的落脚点都在 函数上 2. 实现函数 + 拼接流程

* b 声明式编程 => 声明需求
* c 惰性执行 - 无缝链接，性能节约

```js
    // 惰性函数
    const program = name => {
        if(name === 'progressive') {
            return () => {
                console.log('this is progressive')
            }
        } else if(name === 'objective') {
            return () => {
                console.log('this is objective')
            }
        } else {
            return () => {
                console.log('this is functional')
            }
        }
    }
    program('progressive')()
    program()
```

### 3. 无状态 & 无副作用

* a. 无状态 - 幂等 数据本身是不可变的 - 不可操作改变数据源（所有的功能不随执行次数增加而增加）
* b. 无副作用 - 函数内部不应该直接对整个系统重任何参数&变量进行改动

## 三、实际开发

### 1. 纯函数改造

```js
const _class = {
    name: 'objective'
}
// 函数内引用了外部变量 - 违背【无状态】

const score = str => _class.name + ':' + str;

// 修改了输入参数 -- 违背【无副作用】
const changeClass = (obj, name) => obj.name = name;

// good thing
const score = (obj, str) => obj.name + ':' + str
const changeClass = (obj, name) => ({...obj, name}); 

// 面试题：副作用函数 => split slice splice

```

### 2. 流水线组装 - 加工 & 拼接

#### a. 加工 - 柯里化

把单词执行单次传参变为多次执行多次传参

```js
// f(x, y, z) => f(x)(y)(z)

const sum = (x, y) => {
    return x + y;
}
sum(1, 2)

const add = x => {
    return y => {
        return x + y;
    }
}
add(1)(2)

// 要实现 体系 = 加工 + 组装，单个函数加工输入输出应该单值化 => 单元函数

const fetch = ajax(method, url, params);

const fetch = ajax.get(url)
const request = fetch(url)

```

* 面试题： 手写一个构造可拆分传参的累加函数

add(1)(2)(3)(4)

```js
    // 1. 构造柯里化结构
    // 2. 输入 处理外层 arguments => 类数组的处理
    // 3. 传入的参数无限拓展 => 递归 => 返回递归函数本身
    // 4. 主功能 => 累加 （也可以抽一个函数）
    // 5. 输出 从函数到产出 toString （浏览器里执行函数会给默认返回值，这个返回值就是function 实例里的toString 带来的
    const add = function() {
        // 2. 输入 处理外层 arguments => 类数组的处理
        let args = Array.prototype.slice.call(arguments)
        // 1构造柯里化结构

        let inner = function() {
            // 主功能
            args.push(...arguments)
            return inner;
        }
        // 3.最终返回值输出
        inner.toString = function() {
            return args.reduce((prev, cur) => {
                return prev, cur;
            })
        }
        return inner;
    }

```

#### b. 流水线 - 组装函数

```js
const compose = (f, g) => x => f(g(x));

const sum1 = x => x + 1;
const sum2 = x => x + 2;

const sum12 = compose(sum1, sum2)
```

* 实际实现使用

```js
// 命令式
trim(reverse(toUpperCase(map(arr))));

// 面向对象
arrInstance.map().toUpperCase().reverse().trim()

// 函数式

compose(trim, reverse, toUpperCase, map)
// 忽略中间过程，面相函数的流水线，compose 实现了类似 unix 命令的 | 管道符的作用

```

## 四、 BOX 与 函子

```js

class Mail {
    constructor(content) {
        this.content = content;
    }
    map(fn) {
        return mail(fn(this.content));
    }
}

// 1. 拆开看信
let mail1 = new Mail('love');
// 2. 读了信
let mail2 = mail1.map(function(mail) {
    return read(mail);
})
// 3. 阅后即焚
let mail3 = mail1.map(function(mail) {
    return burn(mail)
})
// 4. 审查
mail3.map(function(mail) {
    return check(mail)
})
// 链式
new Mail('love').map(read).map(burn).map(check);

// 以上封装好的一套逻辑被叫做 BOX
// Functor - 函子 辅助函数式协议的协约
// 1. 具有通用的 map 方法，每次返回新的实例
// 2. 实例与之前实例规则相同
// 3. 传入参数为函数，具有结合外部运算的能力
```
