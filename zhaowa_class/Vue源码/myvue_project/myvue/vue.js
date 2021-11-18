// Vue主文件
import Observer from './observer.js'
import Compiler from './compiler.js'
/**
 * 包括Vue构造函数，接受各种配置参数
 *
 */

export default class Vue {
    constructor(options = {}) {
        this.$options = options;
        this.$data = options.data;
        this.$methods = options.methods;
        
        this.initRootElement(options);
        this._proxyData(this.$data);// 利用Object.defineProperty将data注入vue实例

        // 实例化oberver 对象， 监听数据变化
        new Observer(this.$data);

        // 实例化compiler对象，解析指令和模板表达式
        new Compiler(this);
    }
    /**
     * 获取根元素，并存储到vue实例。简单检查一下传入的el是否合规
     * @param {*} options 
     */
    initRootElement(options) {
        if ( typeof options.el === 'string') {
            this.$el = document.querySelector(options.el)
        } else if (options.el instanceof HTMLElement) {
            this.$el = options.el;
        }
        console.log(this.$el)
        if (!this.$el) {
            throw new Error('传入el不合法，请传入css selector');
        }
    }

    _proxyData(data){
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return data[key]
                },
                set(newValue) {
                    if(data[key] === newValue) {
                        return;
                    }
                    data[key] = newValue;
                }
            })
        })
    }
}