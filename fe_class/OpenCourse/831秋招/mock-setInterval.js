
let timerId = null
function mockSetInterval(fn, delay, ...args) {
    const recur = function () {
        timerId = setTimeout(() => {
            fn.apply(this, args);
            recur();
        }, delay);
    }
    recur();
}   

function mockClearInterval(id) {
    clearTimeout(id);
}

mockSetInterval((name) => {
    console.log(name);
}, 1000, 'xixi  ') 

setTimeout(() => {
    mockClearInterval(timerId)
})