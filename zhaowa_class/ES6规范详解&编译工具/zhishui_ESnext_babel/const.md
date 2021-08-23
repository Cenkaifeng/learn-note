

```js
var a = []
for(var i = 0; i < 10; i++) {
    a[i] = function() {
        console.log(i)
    }
}
a[3]()// 如何打印3


// 解法1 let
// 解法2 closure
var a = []
for(var i = 0; i < 10; i++) {
    a[i] = (function(i){    
        return function() {
            console.log(i)    
        }
    })(i)
}
a[3]()