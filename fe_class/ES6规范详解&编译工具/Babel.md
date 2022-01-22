# Babel 的作用与 AST

https://astexplorer.net/ 查看AST

1. 解析

接受代码输出 AST

* 词法分析
* 语法分析

2. 转换

接受 AST 对其进行遍历，可以对节点进行添加，更新，移除等操作.

3. 生成

把转换过的 AST 生成为字符串形式的代码，并且创建source map.


