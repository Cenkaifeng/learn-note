## vue cli


```bash
npm i @vue/cli -g
```


在package.json 用bin 配置将命令与脚本映射起来
## package.json 
```json
  "bin": {
      "cli": "./index.js"
  },
```

  


  
  `npm link` 

  临时软链指向

  linux 中分为硬链接和软连接 `ln -s link1 link2`
  硬链接指拷贝文件实际位置，文件会成为完全独立的两个文件，内容一样
  而软连接如下，更类似于一种指针指向(类似js中的对象引用)

```bash

C:\Program Files\nodejs\cli -> C:\Program Files\nodejs\node_modules\cli\index.js
C:\Program Files\nodejs\node_modules\cli -> d:\workTest\learn-note\zhaowa_class\VueCli\cli

```