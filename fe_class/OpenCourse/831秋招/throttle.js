

// 时间戳的实现，首节流，第一次立即执行、但是停止触发后，没办法再次执行
// function throttle(fn, interval) {
//     let last = 0;//时间戳模式
//     return function () {
//         const now = Date.now();

//         if (now - last >= interval) {
//             last = now;
//             fn.apply(this, arguments)
//         }
//     }
// }

// 定时器写法，尾节流，不会立即执行函数，而是在delay之后执行。
// 最后一次停止触发后，因为delay的定时器，还会最后执行一次
// function throttle(func, delay) {
//     let timer = null;
//     return function () {
//         const context = this;
//         const args = arguments;
//         if (!timer) {
//             timer = setTimeout(function () {
//                 func.apply(context,args)
//                 timer = null;
//             }, delay)
//         }
//     }
// }

function throttle(func, delay) {
    let timer = null;
    let startTime = 0;
    return function() {
        let curTime = Date.now();
        let remaining = delay - (curTime - startTime);
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        if (remaining <= 0) {
            // 判断是否还有剩余时间
            func.apply(context, args);
            startTime = Date.now();
        } else {
            timer = setTimeout(() => {
                func.apply(context, args);
                startTime = Date.now();
            }, remaining)
        }
    }
}

function handle() {
    console.log(new Date());
}

const throttleHandler = throttle(handle, 2000)


window.addEventListener('scroll', throttleHandler)