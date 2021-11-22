class Parent {
    constructor() {
        this.name = 'aaa'
    }
    getName() {
        console.log('getName')
    }   
}

class Child extends Parent {
    constructor() {
        super();
    }
}