class BaseRouter {
    constructor() {
        this.routes = {}; // 储存path 以及callback的对应关系

        // www.baidu.com/#/a
        this.refresh = this.refresh.bind(this);
        window.addEventListener('load', this.refresh);
        window.addEventListener('hashchange', this.refresh);

    }

    route(path, callback) {
        this.routes[path] = callback || function() {};
    }

    // 渲染当前路径对应的操作
    refresh() {
        const path = `/${location.hash.slice(1) || ''}`;
        this.routes[path]();
    }
}

const body = document.querySelector('body');

function changeBgColor(color) {
    body.style.backgroundColor = color;
}

const Router = new BaseRouter();

Router.route('/', function () {
    changeBgColor('white')
})

Router.route('/green', function () {
    changeBgColor('green')
})

Router.route('/gray', function () {
    changeBgColor('gray')
})