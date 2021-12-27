## 开始有规律的坚持学了

记录一篇讲解递归和树结构的文章

https://mp.weixin.qq.com/s/AzQzw-pC8A-0kS0NJn2eWw

>前中后序是遍历二叉树过程中处理每一个节点的三个特殊时间点，绝不仅仅是三个顺序不同的 List：

前序位置的代码在刚刚进入一个二叉树节点的时候执行；

后序位置的代码在将要离开一个二叉树节点的时候执行；

>中序位置的代码在一个二叉树节点左子树都遍历完，即将开始遍历右子树的时候执行。

```js
// 记录最大深度 TODO: 更新到对应题目
int res = 0;
// 记录遍历到的节点的深度
int depth = 0;

// 主函数
int maxDepth(TreeNode root) {
    traverse(root);
    return res;
}

// 二叉树遍历框架
void traverse(TreeNode root) {
    if (root == null) {
        // 到达叶子节点，更新最大深度
        res = Math.max(res, depth);
        return;
    }
    // 前序位置
    depth++;
    traverse(root.left);
    traverse(root.right);
    // 后序位置
    depth--;
}
// 这个解法应该很好理解，但为什么需要在前序位置增加depth，在后序位置减小depth？

// 因为前面说了，前序位置是进入一个节点的时候，后序位置是离开一个节点的时候，depth记录当前递归到的节点深度，所以要这样维护。
```

遇到一道二叉树的题目时的通用思考过程是：

是否可以通过遍历一遍二叉树得到答案？如果不能的话，是否可以定义一个递归函数，通过子问题（子树）的答案推导出原问题的答案？