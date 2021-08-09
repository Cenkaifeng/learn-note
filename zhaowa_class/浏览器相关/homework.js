// 课后小作业：尝试封装一个通用的异步函数的超时逻辑

// fn 是一个异步函数
async function timeoutFn(fn, timeout = 1000) {
//   if (typeof fn !== 'function') {
//     throw new Error('入参必须为函数')
//   }
//   let originFn = fn

  return new Promise((resolve, reject) => {
    // fn = function(...args) {
    //   fn.apply(this, args)
    //   resolve();
    // }()
    fn().then(resolve())// 
    setTimeout(reject('timeout'), timeout)
  })
}

function test() {
    console.log('测试异步超时')
    let arr = []
    for(let i = 0 ; i < 10000000 ; i++) {
        arr.push(i)
    }
    console.log('test end')
}
// console.log(timeoutFn)

timeoutFn(test, 500).then(value => {
    console.log('函数返回值' + value)
}).catch( e => {
    console.log(e)
})
// console.log(timeoutFn)