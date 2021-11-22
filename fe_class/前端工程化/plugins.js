//微内核

// core <--> plugins
// 加载机制，顺序机制，生命周期，最最重要的就是提供通讯机制

// umi （EventEmitter)


const plugins =[];// new Map();
const registerPlugins = (plugins) => plugins.push(plugin);// DSL
const applyplugins = (...args) => plugins.forEach(plugin => plugin.apply(this,...args));
const skipPlugins = () => {}

// 生命周期

const start = async () => {
    const opts =getUserOptions();

    await loadBuiltinPlugins();

    opts.initBuiltInPlugins && opts.initBuiltInPlugins(); // 其实是生命周期的一种形态了
}