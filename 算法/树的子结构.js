/**
 * 重点思路：
 * 若树 B 是树 A 的子结构，则子结构的根节点可能为树 A 的任意一个节点。因此，判断树 B 是否是树 A 的子结构，需完成以下两步工作：
 * 
    1. 先序遍历树 AA 中的每个节点 NodeA （对应函数 isSubStructure(A, B)）
    2. 判断树 A 中 以 nodeA 为根节点的子树 是否包含树 B

 */

function isSubStructure(A, B) {
  if (!A || !B) {
    return false; // 特殊情况处理 A || B 不可能成为对方的子结构或父结构
  }

  // 返回值处理的三种情况
  // 1. 节点 A 为根节点的子树包含树 B
  // 2. 树 B 是 A.left
  // 3. 树 B 是 A.right
  return recur(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B);
}

function recur(A, B) {
  if (!B) return true; // B 为空，说明越过 B叶子
  if (!A || A.val !== B.val) return false; // A 为空，说明越过 A叶子，值不同也匹配失败。
  return recur(A.left, B.left) && recur(A.right, B.right);
}
