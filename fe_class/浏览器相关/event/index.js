const parent = document.getElementById('parent')
const child = document.getElementById('child')
const son = document.getElementById('son')
const baidu = document.getElementById('a-baidu')

const banned = false;


baidu.addEventListener('click', (e) => {
    e.preventDefault();

})

window.addEventListener('click', (e) => {
    if(banned) {
        alert('你被封禁了');
        e.stopPropagation();
        return
    }

    // e.target.nodeName : 当前点击的元素
    // e.currentTarget.nodeName : 指绑定事件监听的元素
    // e.stopPropagation()
    console.log('window 捕获', e.target.nodeName, e.currentTarget.nodeName)
}, true); // 第三个参数为true 监听捕获阶段，false监听冒泡阶段，默认false

parent.addEventListener('click', (e) => {
    console.log('parent 捕获', e.target.nodeName, e.currentTarget.nodeName)
}, true);

child.addEventListener('click', (e) => {
    console.log('child 捕获', e.target.nodeName, e.currentTarget.nodeName)
}, true);

son.addEventListener('click', (e) => {
    console.log('son 捕获', e.target.nodeName, e.currentTarget.nodeName)
}, true);

son.addEventListener('click', (e) => {
    console.log('son 冒泡', e.target.nodeName, e.currentTarget.nodeName)
});

child.addEventListener('click', (e) => {
    console.log('child 冒泡', e.target.nodeName, e.currentTarget.nodeName)
});

parent.addEventListener('click', (e) => {
    console.log('parent 冒泡', e.target.nodeName, e.currentTarget.nodeName)
});

window.addEventListener('click', (e) => {
    console.log('window 冒泡', e.target.nodeName)
});