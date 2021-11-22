class BomEvent {
    constructor(element) {
        this.element= element;
    }

    addEvent(type, handler) {
        if (this.element.addEventListener) {
            this.element.addEventListener(type, handler, false);// ie 不支持捕获，所以这里统一冒泡
        } else if (this.element.attachEvent) {
            this.element.attachEvent(`on${type}`, function() {
                handler.call(element);
            })
        } else {
            this.element[`on${type}`] = handler;
        }
    }

    removeEvent(type, handler) {
        if (this.element.removeEventListener) {
            this.element.removeEventListener(type, handler, false);
        } else if(this.element.detachEvent) {
            this.element.detachEvent(`on${type}`, handler)
        } else {
            this.element[`on${type}`] = null;
        }
    }


}

function stopPropagation(ev) {
    if (ev.stopPropagation) {
        ev.stopPropagation(); // 标准 w3c浏览器
    } else {
        ev.cancelBuble = true;// IE 里如何阻止事件的冒泡
    }
}

function preventDefault(event) {
    if(event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}