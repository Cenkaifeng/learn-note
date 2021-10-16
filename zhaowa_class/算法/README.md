## 算法与数据结构

##### 上

*****
关于算法押题：
不要抱太大希望，只能对类型做预估。日常刷的题对实际开发用到的概率其实不大，算法锻炼的更多的是锻炼逻辑思维培养惯性。对未来底层开发提供技术储备，对中高级工程师未来工作内容起到支持，所以也是中高级岗位的必备能力。


算法又可以看做是连接数据元素的流程

数据结构：
    * 数组 & 链表：展示上都是一串元素的顺序集合
    * 数组：连续的，且能通过索引查找
    * 链表：不连续、间断的。所以无法通过索引（index)去获取固定的值。但是有个next指针。

使用场景总结
查找：
* 数组连续，查找效率高，可以迅速定位到数组中某个节点位置
* 链表则需要通过前一个元素指向下一个元素地址，需要前后依赖，效率低

插入：
* 数组中元素插入会引起被插入位后所有元素索引的改变，而链表只需要改变某一个节点的next指针

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
```js
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

const isValid = function() {
    // 涉及使用数据结构 - 栈
    const stack = new Stack();
    const map = {
        '}': '{',
        ']': '[',
        ')':'(',
        '>':'<'
    }
    ~~~~
}
```
#### 堆

前端对于这个概念了解的相对会比较少，这个涉及到了js的运行与存储。js 中 stack 存储kv值. heap 存的是v作为引用类型具体位置

堆是可以在运行时拿到的，效率相对会低一些。