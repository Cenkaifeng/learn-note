const fs = require('fs');
const path = require('path');
// 脚本中需要使用绝对路径来表示目标文件

// nodejs 中有个特点，错误优先，回调函数一定放最后
const pathToFile = path.resolve(__dirname, './text');
// fs.readFile(pathToFile, 'utf-8', function(err, result) {
//     if (err) {
//         console.log('error:', err);
//         return err;
//     }
//     console.log('result: ', result);
// })

// 同步读取（阻塞）
// const content = fs.readFileSync(pathToFile, 'utf-8');
// console.log('sync content', content);

function promisify(func) {
    // 把接受的函数变为promise

    return function(...args) {
        return new Promise((resolve, reject) => {
            args.push(function(err, result) {
                if (err) return reject(err);
                return resolve(result);
            })
            return func.apply(func, args);// 这里apply的用处是将参数以数组的方式注入            
        })
    }
}

const readFileAsync = promisify(fs.readFile);

readFileAsync(pathToFile, 'utf-8')
    .then(content => {
        console.log('readFileAsync:',content)
    })
    .catch(e => {
        console.log('e', e)
    })