// 中断的是，下一次的 beginWork

function workLoopSync() {
    // Already timed out, so perform work without checking if we need to yield.
    while (workInProgress !== null) {
    performUnitofwork(workInProgress);
    }
}
function workLoopconcurrent () {
// Perform work until Scheduler asks us to yield
// shouldYield 是异步可中断的关键！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    while (workInProgress !== null && !shouldYield()) {
        performUnitofWork(workInProgress);
    }
}

// shouldYield 意思是，交出执行权 使用 requestIdlCallback (react 模拟了一个api)