const xhr = new XMLHttpRequest();

xhr.open('GET', 'http://domain/serivce');

xhr.onreadystatechange = function () {
  if (xhr.readyState !== 4) {
    return;
  }

  if (xhr.status === 200) {
    console.log(xhr.responseText);
  } else {
    console.error(`HTTP error, status=${xhr.status}, errorText=${xhr.statusText}`);
  }
}
xhr.timeout = 3000;
xhr.ontimeout = () => {
  console.log(`当前请求超时啦！`)
}

xhr.upload.onprogress = p => {
  const percent = Math.round((p.loaded / p.total) * 100) + '%';
}

xhr.send(); // 注意：请求发送前一定要建立对状态的监听


fetch('http://domain/service', {
  method: 'GET',
  credentials: 'same-origin' // 限制同域请求传cookie
}).then(response => {
  if (response.ok) {
    // 请求成功
    return response.json();
  }

  throw new Error('http error');
}).then(json => {
  console.log(json);
}).catch(error => {
  // 整体统一的错误管理 + fetch 本身的错误
})

//fetch 如何设置超时？ fetch本身不支持超时如何封装？

function fetchTimeout(url, init, timeout = 3000) {
  return new Promise((resolve, reject) => {
    fetch(url, init).then(resolve).catch(reject);
    setTimeout(reject, timeout);
  })
}



// 课后小作业：尝试封装一个通用的异步函数的超时逻辑

function timeoutFn(fn, timeout) {
  if (typeof fn !== 'function') {
    return
  }
  const timer;
  return new Promise((resolve, reject) => {
    resolve(fn())
    // clearTimeout(timer)

    timer = setTimeout(() => {
      reject()
    }, timeout)
  })
}


// 如何中断一个fetch?

const controller = new AbortController();

fetch('http://domain/service', {
  method: 'GET',
  credentials: 'same-origin',
  signal: controller.signal
}).then(response => {
  if (response.ok) {
    // 请求成功
    return response.json();
  }

  throw new Error('http error');
}).then(json => {
  console.log(json);
}).catch(error => {
  // 整体统一的错误管理 + fetch 本身的错误
})

controller.abort();