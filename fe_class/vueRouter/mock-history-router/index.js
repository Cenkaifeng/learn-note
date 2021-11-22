class _BaseRouter {
    constructor() {
        this.routes = {}; 
        this.init(location.pathname);
        this.bindPopstate();


    }

    init(path) {
        window.history.replaceState({
            path
        }, null, path);
        this.invokePatchCallback(path)
    }

    route(path, callback) {
        ths.routes[path] = callback || function () {};
    }

    go(path) {
        window.history.pushState({path}, null, path);
        this.invokePatchCallback(path);
    }

    bindPopstate() {
        window.addEventListener('popstate', e => {
            const path = e.state && e.state.path;
            this.routes[path] && this.routes[path]();
        })
    }
    invokePatchCallback(path) {    
        const cb = this.routes[path];
        if (cb) {
            cb();
        }
    }
}

const body = document.querySelector('body');
const container = document.querySelector('.container');
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

container.addEventListener('click', e => {
    if(e.target.tagName === 'A') {
        e.preventDefault();
        Router.go(e.target.getAttribute('href'));
    }
})


class BaseRouter {
    constructor() {
        this.routes = {};
        this.bindPopstate = this.popState.bind(this);// TODO: 回看的时候看看怎么说的 React 组件写法...
        // 为了this获取的时候能正确花去到值
        this.bindPopstate();// 不用bind 因为window
    }

    init(path) {
        window.history.replaceState({
            path
        }, null, path);
        this.execCallbackByPath(path)
    }
    route(path, callback) {
        this.routes[path] = callback || function() {};
        
    }
    popState() {
        window.addEventListener('popstate', (e) => {
            const path = e.state && e.state.path;;
            console.log(path);
            this.execCallbackByPath(path);
        })
    }
    execCallbackByPath() {
        const cb = this.routes[path];

        if (cb) {
            cb();
        }
    }
}