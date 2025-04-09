
// 装饰器模式应用
// ts 预防加持下的装饰器模式应用 需要打开配置
/*
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
*/

function log() {
    return function (target: Object, propertyKey: string | Symbol, descriptor:TypedPropertyDescriptor<(num:number)=> number > ) {
        const originMethod = descriptor.value

        descriptor.value = function (...args) {

            console.log(propertyKey as string, '调用:', args);

            const res = originMethod.apply(this, args);

            console.log(propertyKey as string, '调用完成, 结果', res);

            return res
        }
        return descriptor
    }
}

class Ops {
    public amount = 100;
    
    @log()
    deposit(num) {
        console.log('用户存了', num)
        this.amount = this.amount + num
        return this.amount
    }

    @log()
    withDraw(num) {
        console.log('用户取了', num)
        this.amount = this.amount - num
        return this.amount
    }
}

// js 用法


const obj = {
  foo() {
    console.log('foo');
  }
}

function barDecorator(obj) {
  obj.bar = function() {
    console.log('bar');
  }
  return obj;
}

const decoratedObj = barDecorator(obj);
decoratedObj.foo();
decoratedObj.bar();