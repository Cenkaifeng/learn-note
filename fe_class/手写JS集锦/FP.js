// 函数式编程

// 描述：手写一个函数 input: Array
// 不考虑参数校验
// 输出: 每一个数，要去零，每一位*2 返回一个新数组。

// 题目难度维度，1 增加本身深度【算法】 2增加题目扩展性【设计】


function generateArray(arr) {
  let res = [];
  for(let i = 0 ; i < arr.length; i++) {
    if(arr[i]) res.push(arr[i] * 2)
  }
  return res;
}

// 那么 增加一个函数每一位乘3 考察高价函数封装、函数柯里化

function generateArray(num) {
  return function(arr) {
    let res = [];
    for(let i = 0 ; i < arr.length; i++) {
      if(arr[i]) res.push(arr[i] * num)
    }
    return res;    
  }
}

// 新需求：
const filterBoolean = arr => arr.filter(Boolean); // item => Boolean(item)

// 乘法器
const multiply = num => arr => arr.map(item => item * num);
const mutiply2 = mutiply(2);
const mutiply3 = mutiply(3);

// 筛选器
const filterBigger = num => arr => arr.filter(item => item <= num);
const filterBigger10 = filterBigger(10);

const compose = (...rest) => startNum => rest.reduce((total, item) => item(total), startNum);
// fn1, fn2, fn3 --> fn3(fn2(fn1(startNum)))

const modifyArr = compose(filterBoolean, mutiply3, filterBigger10);
let arr = [0, 1, 2, 3, 4]
console.log(modifyArr(arr));

// 函数式编程中，compose 是一个非常重要的概念