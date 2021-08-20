class BaseRouter {
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