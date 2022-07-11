## 持续交付持续部署

记录部署学习的笔记


### 简易直接部署
test scp command
scp -P 8999 -r ./* jervis@127.0.0.1:/home/jervis/          
jervis@127.0.0.1's password: 

### ci / id
常见工具有 travis, circle 和 github actions 


现有断言库依赖 nodejs 内置的 assert 
```js
const assert = require('assert');

assert.strictEqual(1, 2, "内容不相等")
```

即使你的测试用例覆盖率100% 但是仍然需要担心运行时的问题

snapshots 快照

```js
test('', () => {
    const linkElement = screen.getByText(/xxxx/i)
    expect.toMatchSnapshot();// 快照
})
```