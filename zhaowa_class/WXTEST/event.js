class Event {
    constructor(anme) {
        this.name = name;
        this.observers = {};

    }

    // emit 
    emit(type, opt) {
        this.observers[type].map(item => [ item(opt)])
    }
    // on
    on(type, fn) {
        if(this.observers[type]) {
            this.observers[type].push(fn);
        } else {
            this.observers[type] = [fn];   
        }
    }
}