interface IOptions {
  url: string;
  type ? : 'GET' | 'POST';
  data: any;
  timeout ? : number;
}

function formatUrl(object) {
    // a=xxx&b=xxx; querystring
    let dataArr = [];
    for (let key in object) {
        dataArr.push(`${key}=${encodeURIComponent(object[key])}`);// 参数可能带url 中间会有一些解码问题
    }
}

export function ajax(options: IOptions = {
  type: 'GET',
  data: {},
  timeout: 3000,
  url: ''
}) {
  return new Promise((resolve, reject) => {
    if (!options.url) { // 防止对方 ajax({} as any) 强制绕过类型检查
      return;
    }

    const queryString = formatUrl(options.data);
    const onStateChange = () => {// 状态判断
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
                clearTimeout(timer);// 请求发送成功后其实可以清楚timer了
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.status);
                }
            }
        }
    
    }
    let timer;
    let xhr;

    if ((window as any).XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');// ie 兼容xhr的一种形式
    }

    if (options.type.toUpperCase() === 'GET') {
        xhr.open('GET', `${options.url}?${queryString}`);
        onStateChange();
        xhr.send();
    } else if (options.type.toUpperCase() === 'POST') {
        xhr.open('POST', options.url);
        xhr.setRequestHeader('COntentType', 'application/x-www-form-urlencoded');
        onStateChange();
        xhr.send(options.data);
    }


    if (options.timeout) {
        timer = setTimeout(()=> {
            xhr.abort();
            reject("timeout");
        },options.timeout)
    }

    // 判断GET POST
    //xhr.send()
  })
}