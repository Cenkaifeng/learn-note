let arr =  [1,2,2,4,null,null,'3','abc',3,5,4,1,2,2,4,null,null,'3','abc',3,5,4]


// 一、利用对象key 唯一性
// 利用对象的key 不可重复，否则后者将前者覆盖的特性，实现数组去重。
// let obj = {}; 
// for (let i = 0 ; i < arr.length; i ++) {
//     let item = arr[i];
//     if (obj[item] !== undefined) {
//         arr.splice(i, 1);
//         i --; // 解决删除元素后，数组塌陷问题
//         continue;
//     }
//     obj[item] = item;
// }

// 二、交换元素位置从而替换splice方法

// 方法一的问题存在性能问题，splice实现删除行灯不好，会出现数组塌陷问题。

let obj = {};
for (let i = 0; i < arr.length; i ++) {
    let item = arr[i];
    if (obj[item] !== undefined ) {
        arr[i] = arr[arr.length -1 ];
        arr.length --;
        i --;
        continue;
    }
    obj[item] = item;
}

// 三、Array.filter + Array.indexOf (es5)

// 注：filter 不会对空数组监测、不会改变原数组

let newArr = arr.filter((item, index) => arr.indexOf(item) === index);


// 四、Array.filter + Object.hasOwnProperty

// 原理：同一，利用对象键名不重复特点

let obj = {}
arr.filter(item => obj.hasOwnProperty( typeof item + item) ? false : (obj[typeof item + item] = true))

// 五、Array.reduce + Array.includes
// reduce(): 接受一个函数作为累加器，数组中的每个值从左到右开始计算，最终计算为一个值。
// Ex: arr.reduce(function(total, currValue, currIndex, arr), initValue)
/**
 *  reduce() 对于空数组是不会执行回调函数的。
    total：必需。初始值, 或者计算结束后的返回值
    currValue：必需。当前元素
    currIndex：可选。当前元素的索引
    arr ：可选。当前数组对象。
    initValue：可选。累加器初始值
 */

let newArr = arr.reduce((accu, cur) => {
    return accu.includes(cur) ? accu : accu.concat(cur); // 4-1：拼接法
    // return accu.includes(cur) ? accu : [...accu, cur]; // 4-2：拓展运算符
},[])

// 六、Array.indexOf
let newArr = []
for (let i = 0; i < arr.length; i ++ ) {
    if (newArr.indexOf(arr[i]) === -1) newArr.push(arr[i])
}
// 也能用forEach

// 七、Array.includes(): 判断数组是否包含值返回 boolean

let newArr = [];
for (var i = 0; i < arr.length; i ++) {
    if (!newArr.includes(arr[i])) newArr.push(arr[i]);
}

// 八、 new Set + 拓展运算符 Array.from

let newArr = [...new Set(arr)];

let newArr = Array.from(new Set(arr));

let newStr = [...new Set('abass')].join('') // abc

// 九、new Map 
/**
 * ES6 提供了新的数据结构 Map 。类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。

get方法读取key对应的键值，如果找不到key，返回undefined。

has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
 */

let map = new Map();
let newStr = [];

for (let i = 0; i< arr.length; i++) {
    if(!map.has(arr[i])) {
        map.set(arr[i], true);
        newStr.push(arr[i]);
    }
}
