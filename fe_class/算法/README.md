# 算法与数据结构

#### 数据结构

*****
关于算法押题：
不要抱太大希望，只能对类型做预估。日常刷的题对实际开发用到的概率其实不大，算法锻炼的更多的是锻炼逻辑思维培养惯性。对未来底层开发提供技术储备，对中高级工程师未来工作内容起到支持，所以也是中高级岗位的必备能力。


算法又可以看做是连接数据元素的流程

数据结构：
    * 数组 & 链表：展示上都是一串元素的顺序集合
    * 数组：连续的，且能通过索引查找
    * 链表：不连续、间断的。所以无法通过索引（index)去获取固定的值。但是有个next指针。

我们看看数据结构民间定义：
> 数据结构是数据对象，以及存在于该对象的实例和组成实例的元素之间的各种联系。这些联系可以通过定义相关的函数来给出 ——-------- 《数据结构、算法与应用》
> "数据结构是ADT(抽象数据类型 Abstract Data Type)的物理实现。" ——《数据结构与算法分析》

> "数据结构(data structure) 是计算机中储存、组织数据的方式。通常情况下，精心选择的数据结构可以带来最优效率的算法。" —— 中文维基百科 ***

使用场景总结
查找：
* 数组连续，查找效率高，可以迅速定位到数组中某个节点位置
* 链表则需要通过前一个元素指向下一个元素地址，需要前后依赖，效率低

插入：
* 数组中元素插入会引起被插入位后所有元素索引的改变
* 链表只需要改变某一个节点的next指针

##### 面试题 实现链表
// head => node1 => node2 => ... => null 
```js
// 链表类结构
class LinkList {
    constructor() {
        this.length = 0;
        this.head = null; // 可以用做链表是否为空的判断
    }

    getElementAt(position) {
        // 返回索引对应的元素
    }
    //添加节点
    append(element){}
    // 指定位置添加节点
    insert(position, element) {}
    // 删除指定位置元素
    removeAt(position){}
    //查找给定元素索引
    indexOf(element) {}
}

// 具体实现
getElementAt(position) {
    if(position < 0 || position >= this.length) return null;

    let current = this.head;
    for(let i= 0; i < position; i++ ) {
        current = current.next;
    }
    return current;
}

// 组装标准链表节点的辅助类
class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

// 生成复杂元素 node
append(element) {
    let node = new Node(element);

    // 链表为空时
    if (this.head = null) {
        this.head = node;
    } else {
        // 找到链表的尾巴
        let current= this.getElementAt(this.length - 1); 
        current.next = node;
    }

    this.length++;
}
insert(position, element) {
    if (position < 0 || position > this.length) return false;

    let node = new Node(element);

    if (position === 0 ) {
        node.next = this.head;
        this.head = node;
    } else {
        let previous = this.getElementAt(position -1);

        node.next = previous.next;
        previous.next = node;
    }
    this.length++;
    return true;
}

removeAt(position) {
    if (position < 0 || position > this.length) return false;

    let current = this.head;
    if (position === 0 ) {
        this.head = current.next;
    } else {
        let previous = this.getElementAt(position -1);

        current = previous.next;
        previous.next = current.next;
    }
    this.length--;
    return current.element;
}

indexOf(element) {
    let current = this.head;
    for(let i = 0; i < this.length; i++) {
        if(current.element === element) return i;

        current = current.next;
    }
    return -1;
}

// 双向列表
// head <=> node1 <=> node2 <=> ... <=> null(tail)
// tail、prev
class DoubleLink extends Linklist {
//  
}
```


栈：先入后出（更像个盒子）

队列：先入先出（像流水线、管道）


##### 面试题 实现一个栈
```javascript
//stack_queue

class Stack {
    constructor() {
        this.items = [];
    }

    // 添加新元素到栈
    push(element) {
        this.items.push(element);
    }

    // 移出栈顶元素
    pop() {
        return this.items.pop();
    }

    // 获取栈顶元素
    peek() {
        return this.item[this.items.length - 1];
    }

    // 判断空
    isEmpty() {
        return this.items.length === 0;
    }

    clear() {
        this.items = [];
    }

    size() {
        return this.items.length;
    }
}

// 栈可以看做是个阉割版本的数组操作...

// 拓展
// 如何判断括号有效性 （自闭合)
// '[]{}' ture, '{{}[]' false, '[{()}]' true;

const isValid = function(s: string) {
    // 涉及使用数据结构 - 栈
    const stack = new Stack();
    const map = {
        '}': '{',
        ']': '[',
        ')':'(',
        '>':'<'
    }
    
    for(let i = 0; i < s.length; i++ ) {
        const char = s[i];

        stack.push(char);

        if (stack.size < 2 ) continue;

        const theLastOne = stack[stack.size - 1];
        const theLastTwo = statck[stack.size - 2];

        if (map[theLastTwo] === this.theLastTwo) {
            stack.pop();
            stack.pop();
        }

    }
    return stack.size === 0;
}
```
##### 堆

前端对于这个概念了解的相对会比较少，这个涉及到了js的运行与存储。js 中 stack 存储kv值. heap 存的是v作为引用类型具体位置

堆是可以在运行时拿到的，效率相对会低一些。


##### 哈希 map

快速查找和定位
密码、罗马文、回文

```js

const MAP = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
}
// IV 4
// VI 6
const romanToInt = function(s: string) {
    let len = s.length;
    let res = 0;
    let max = 0;

    while( len --) {
        let num = MAP[s[len]];
        // IV 颠倒值不直接相加，用大的减小的
        if (max > num) { // 判断大小、然后考虑特殊情况 （左边比右边小）
            res -= num;
            continue;
        }

        max = num;
        res += num;
    }


    return res;
}
```

#### 树图

##### 树结构


深度优先、广度优先


前序遍历：（中左右）
中序遍历：（左中右）
后序遍历：（左右中）

```js
// 树结构
const PreOrder = function(node) {
    if(node !== null) {
        console.log(node.val);
        PreOrder(node.left);
        PreOrder(node.right);
    }
}

const InOrder = function(node) {
    if(node !== null) {
        InOrder(node.left);
        console.log(node.val);
        InOrder(node.right);
    }
}

const PostOrder = function(node) {
    if(node !== null) {
        PostOrder(node.left);
        PostOrder(node.right);
        console.log(node.val)
    }
}

// 查找最大值，偶数层、拍平（树结构拍平成为对象或者数组）
```

算法
1. 数据结构
2. 常用基础算法
   1. 分治
   2. 贪心算法
   3. 动态规划
   4. 二分法
   5. ...
3. 树图
4. 排序

##### 图 graph
图与图算法：

构成：边集合 + 顶点集合
分类：
    1. 有向图（有序）
    2. 无向图（无序）
    3. 构造图（符合引用）

试题：实现图类

```js
class Graph {
    constructor(v) {
        this.vertices = v; // 确定顶点个数
        this.edge = 0; // 边集合数
        this.arr = [];
        // 初始化描述数组 - 多少个顶点就有多少元素可以进行连接

        for(let i = 0; i < this.vertices; i ++) {
            this.arr[i] = [];
        }
    }
    // 边操作
    addEdge(v, w) {
        this.arr[v].push(w);
        this.arr[w].push(v);
        this.edges++;
    }

    // 绘图
    showGraph() {
        let str;
        for(let i = 0; i < this.vertices; i++ ) {
            str = i + '->';
            for (let j = 0; j < this.certices; j++ ) {
                if(this.arr[i][j] !== undefined) {
                    str += this.arr[i][j];
                }
            }
        }
        console.log(str)
    }
}
```

图来解决（什么时候用图） - 路径类问题、查找类问题

**树和图本质上都是对节点结构的一种系统描述**

// 图解决深度优先问题
// 起始点开始查找直到最末的顶点，在返回追溯，直到没有路径为止

```js
constructor() {
    //...
    this.marked = []; // 已经被访问过的节点
    for(let i = 0; i < this.vertices; i ++) {
        this.marked[i] = false;
    }
}
dfs(v) {
    this.marked[v] = true;
    if(this.arr[v] !== undefined) {
        console.log('dfs visited' + v);
    }
    this.arr[v].forEach(w => {
        if(!this.marked[w]) {
            this.dfs(w);
        }
    })
}

bfs(s) { // 广度优先 - 最相邻节点遍历
    let queue = [];
    this.marked[s] = true;
    queue.push(s);

    while(queue.length > 0) {
        let v = queue.shift();

        if(v !== undefined) {
            console.log('bfs visited' + v)
        }

        this.arr[v].forEach(w => {
            if(!thsi.marked[w]) {
                queue.push(w);
                this.marked[w] = true;
            }
        })
    }

}

// 面试题 - 最短路径方法

// 利用广度优先天然临近查找的优势
// 1. 需要一个数组用来保存所有执行路径
// 2. 除了标记节点是否被访问过之外，添加一条边来描述顶点到当前顶点的路径

constructor() {
    // ...
    this.edgeTo = [];
}

bfs() {
    let queue = [];
    this.marked[s] = true;
    queue.push(s);

    while(queue.length > 0) {
        let v = queue.shift();

        if(v !== undefined) {
            console.log('bfs visited' + v)
        }

        this.arr[v].forEach(w => {
            if(!thsi.marked[w]) {
                queue.push(w);
                this.marked[w] = true;
                this.edgeTo[w] = v; // 做一个连接顶点记录，记录一下连接路径
            }
        })
    }
}

function pathTo(t, v) {
    let source = t;

    for(let i = 0; i < this.vertices; i++) {
        this.marked[i] = false;// 重置标识集合
    }

    this.bfs(source);

    if(!this.marked[v]) {
        return undefined;
    }

    let path = [];

    for(let i = v; i !== source; i = this.edgeTo[i]) {
        path.unshift(i);
    }

    path.unshift(source);

    let str = '';

    for(let i in path) {
        if (i < path.length - 1 ) {
            str += path[i] + '->';
        } else {
            str += path[i];
        }
    }
    console.log(str);

    return path;
}

let g = new Graph(5);
g.addEdge(0, 1);
g.addEdge(1, 3);
g.addEdge(0, 4);
g.pathTo();
```

****


#### 算法复杂度 complexity

##### 时间复杂度

1. 关注点在循环次数最多的代码块
2. 最大值原则 - 存在多个循环，总复杂度等于最大的代码块复杂度
3. 乘法原则 - 嵌套代码复杂度等于嵌套内外代码块复杂度的乘积

example
```js
function total(n) {
    let sum = 0; //t
    for(let i = 0; i < n; i++ ) {//nt
        sum += i; // nt
    }
    return sum;//t
}
// 执行了 t + nt + nt = 2(n + 1)t 长时间

function total(n) {
    let sum = 0; //t
    for(let i = 0; i < n; i++ ) {//nt
    for (let j = 0; j < n; j ++) {// n*n*t
        sum = sum + i + j;// n*n*t
    }
    }
    return sum;//t
}
// 执行了 t + nt + n*n*t + n*n*t + t = (2n*n + n + 2)t 长时间

// n => 无穷大  O(n) \ O(n*n)

// 常数阶 O(1)
// 对数阶 O(logN)
// 平方阶...

// 复杂度用例

const sum_plus = function() {
    let i = 1;
    let j = 2;

    ++ i;
    j++;
    return i + j;
}// o(1);

const foo2 = function(n) {
    for(let i = 1; i<= n; ++i ) {
        let j = i;
        j ++;
    }
} // o(n)

const foo3 = function(n) {
    let i = 1;
    while(i < n) {
        i = i * 2;
    }
}// i 等比变化
// 2 的 x 此房等于n, 那么 x = log2^n
// 循环log2^n次以后，结束
// o(logN)

const foo3 = function(n) {
    for(Let m = 1; m < n ; m ++) {
        let i = 1;
        while(i < n) {
            i = i * 2;
        }        
    }

}// o(nlogN)

function total(n) {
    let sum = 0;
    for (let i = 0; i< n; i++ ) {
        for (let j = 0; j < n; j++ ) {
            sum = sum + i + j;
        }
    }
    return sum;
}// O(n^2)




```

##### 空间复杂度

判断存储
最后看的是中间执行的变量的增长方式

1. 常量
```js
let j = 0;
for(let i = 0; i< n ; i++) {
    j ++;
}// O(1)

// 线性增长
let j = [];

for (let i = 0; i< n; j ++) {
    j.push(i);
}// O(n); 线性增长

```

#### 常用基础算法

##### D&C 分治（二分法集大成...）
分治法

工作原理（如何确定case 适用分治）：

1. 可以明确设定一条基线
2. 根据此基线可以不停将问题进行分解，直到所有内容符合基线标准
// 以上也是二分的前置条件

快排

```js
const quickSort = function(arr) {
    // 校验
     if(arr.length <= 1 ) {
         return arr;
     }
    // 1. 找到基线，并对基线左右做声明
     let pivotIndex = Math.floor(arr.length / 2); // arr.length >> 1
     let pivot = arr.splice(pivotIndex, 1)[0];
     let left = [];
     let right = [];
    // 2. 遍历当前的内容，按照基线去划分左右
     for(let i  = 0; i < arr.length; i++ ){
         if(arr[i] < pivot) {
             left.push(arr[i]);
         } else {
             right.push(arr[i]);
         }
     }
    // 3. 递归处理，不断根据新的基线生成新内容，并进行连接
     return quickSort(left).concat([pivot], quickSort(right));
}
```

##### 贪心

核心：利益最大化,始终查找最大的项目，尽可能快满足需求

何时适用贪婪：需要查找最大项目等类型，同时满足利益最大化

```js

// 给定一个整数数组nums,找一个具有最大和的连续子数组（子数组必须包含一个元素），返回其最大和

const maxSubArray = function(nums) {
    // 入参判断
    if(nums.length <= 1) return nums;

    let ans = nums[0];

    let sum = 0;
    for (const num of nums) {
        // 最快扩充当前数据量 or 最短途径满足需求
        if(sum > 0) {
            sum += num;
        } else {
            sum = num;
        }
        ans = Math.max(ans, sum);
    }

    return ans;
}

```

##### 动态规划
何时适用：将待求解的问题分解成若干子问题；子问题之间相互有联系（分治无联系）

逐个分解
将上一步的结论作为下一步条件传入

```js
// 斐波那契
// F(0) = 0， F(1) = 1
// F(n) = F(n - 1) + F(n - 2), 其中 n > 1

const fib = function(n) {
    // 传入校验
    if( n < 2 ) return n;

    // 1. 确定分界
    let pre = 0;
    let next = 0;
    let res = 1;

    // 2. 遍历所有内容进行运算执行
    for (let i = 2; i <= n; i++) {
        // 3. 所有内容项目进行关联与格力
        pre = next;
        next = res;
        res = pre + next;
    }
    return r;
}

// git diff (怎么判断代码，处理分支？ 本质上还是动态规划)


```

##### dfs & bfs 深度优先和广度优先参考 graph 那个部分

