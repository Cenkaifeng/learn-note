插件机制：对外暴露了内部可用能力的拓展

配置式
约定大于配置：限定用户，约定式的方式好于配置式。


unlink 解除链接

JervisnoMBP:dd jerviscen$ npm link
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN dd@1.0.0 No description
npm WARN dd@1.0.0 No repository field.

updated 74 packages and audited 74 packages in 14.891s

10 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

/usr/local/bin/dd -> /usr/local/lib/node_modules/dd/bin/index.js
/usr/local/lib/node_modules/dd -> /Users/jerviscen/work/test_park/learn-note/zhaowa_class/VueCli/dd
JervisnoMBP:dd jerviscen$ cd ../bobi_demo/
JervisnoMBP:bobi_demo jerviscen$ npm link dd
/Users/jerviscen/work/test_park/learn-note/zhaowa_class/VueCli/bobi_demo/node_modules/dd -> /usr/local/lib/node_modules/dd -> /Users/jerviscen/work/test_park/learn-note/zhaowa_class/VueCli/dd
JervisnoMBP:bobi_demo jerviscen$ npm run build

> demo@1.0.0 build /Users/jerviscen/work/test_park/learn-note/zhaowa_class/VueCli/bobi_demo
> dd

build success.