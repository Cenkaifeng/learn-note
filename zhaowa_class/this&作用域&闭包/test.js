// (function() {
//     function outer() {
//     let a = 1;
//     function inner() {
//         var a = 2;
//         console.log(this.a);
//     }
//     inner()
// }
//     outer()
// })()


function fn() {
    return {
        b: () => {
            console.log(this);
        }
    }
}

fn().b()// window/global
fn().b.bind(1)()// window/global
fn.bind(2)().b.bind(3)()// 2


function fn1() {
    console.log(this);
}

const obj = {
    fn
}

