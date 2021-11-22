#!/usr/bin/env node 
// 头部标记：二进制脚本执行的默认环境配置
const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const inquirer = require('inquirer');// 命令行问讯库
const childProcess = require('child_process');


program
    .arguments('<dir>') // <>: 必填项 []:可填项
    .description('this is aa directiory!')
    .action((dir) => {
         console.log('--dir', dir)
         inquirer.prompt([
             {
                 type: 'list',
                 name: 'framework',
                 message: 'which framework do you like?',
                 choices: [
                     'react',
                     'vue'
                 ]
             }
         ])
         .then((answers) => {
             console.log('result', dir, answers)
             const fullDir = path.resolve(process.cwd(), dir)
             console.log('-----fullDir', fullDir)
            //  fs.writeFileSync();
            // git clone xxx dir
            // 可以使用git 以外的方式
            const command = `git clone https://github.com/loatheb/${answers.framework}-xxx.gitc `
            childProcess.execSync(command)
        })
    })

program.parse(process.argv)