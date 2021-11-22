import Dep from "./dep.js";

export default class Watcher {
    /**
     * 
     * @param {*} vm 当前vue实例
     * @param {*} key 当前值名称，data中的属性名
     * @param {*} cb 负责更新视图的回调函数
     */
    constructor(vm, key, cb) {
        this.vm = vm;
        this.key = key;
        this.cb = cb;

        Dep.target = this;// 只维持当前一个watcher  这个this,就是获取oldValue 收集的依赖 在get里

        // this.oldValue = ''// 旧值是通过什么获取的呢？ 答：旧值就是初始化的时候拿的，也就是当前值，因为update调用时已经是坚挺到变化了
        // 触发get 方法，在get方法中会做什么操作？
        this.oldValue = vm[key]

        Dep.target = null;
;    }
    /** 数据变化时更新视图 */
    update(){
        let newValue = this.vm[this.key];
        if (this.oldValue === newValue) {
            return
        }
        this.cb(newValue);
    }
}
// watcher 初始化获取oldValue的时候，回去做一些操作，具体是那些？
// 通过vm[key] 获取oldValue前，为什么要将当前的实例挂载在Dep上？获取之后为什么又置为nupdateull了？
// update方法放在什么时候执行？ A: Dep.notify() 中