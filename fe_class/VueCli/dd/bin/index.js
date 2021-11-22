#!/usr/bin/env node

const webpack = require('webpack');
const minimist = require('minimist');
const builtInWebpackConfig = require('../webpack.config');
const path = require('path');
const args = minimist(process.argv.slice(2));

// 这里只是为了好看代码，写一起了，正常是要做一下拆分的
// class PluginManager {} <- 内聚到一个模块实现会好点
const __commands = {};
const __plugins= {};
const fname = 'dd.config.js'


const runWebpackBuild = () => {

    webpack(builtInWebpackConfig, (err, stats) => {
        if (err || stats.hasErrors()) {
            return console.log('build failed.')
        }

        console.log('build success.', args)
    })    
}

// 封装 api 这个是作为参数塞到自定义插件函数中的，通过这个api 往外暴露的能力
// 正常还是要写一个 class Api extends BaceApi {}
const api = {
    registerCommands(name, impl) {
        const command = __commands[name];
        if (!command) {
            __commands[name] = impl
        }
    },
    chainWebpack() {

    },
    addWebpackPlugin(plugin) {
        
    }
}

// 读取本地的配置文件 dd.config.js
const readLocalOptions = () => new Promise((resolve) => {
    const config = require(path.join(process.cwd(), fname)) || {};
    const {plugins: { commands = [] } = {}} = config;
    if (commands.length) {
        commands.forEach( command => {
            command(api);// 把api暴露给插件
        })
    }

    resolve(__commands);
})

readLocalOptions().then((commands) => {
    const command = args._[0];// 取执行命令 dd clean
    if (commands[command]) {
        commands[command]();
    }
    else {
        runWebpackBuild();
    }
})