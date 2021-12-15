import Vue from './myvue/vue.js';

const vm = new Vue({
    el: '#app',
    data: {
        msg: 'Hello Lubai',
        name: 'jervis',
        count: '100',
        testHtml: '<ul><li>这是v-html渲染</li></ul>',
        obj: {
            height: 111,
            weight: 222,
            arr: [1,2,3,2]
        },
        arr: [1,2,3,4]
    },
    methods:{
        handler() {
            alert(111);
        }
    }
})

console.log(vm);