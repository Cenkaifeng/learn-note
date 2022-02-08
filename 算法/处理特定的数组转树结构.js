/**
 * 题干：假设有以下数据 [{pid: xx, id: xx}, {pid: xx, id: xx} ...]
 *
 * pid 为父节点id, id为当前节点id
 *
 * 要求尽可能少的复杂度实现将当前结构转化成树结构
 */

// 解 1

function convert(list) {
  const res = [];
  const map = list.reduce(
    (res, v) => ((res[v.id] = v), (v.children = []), res),
    {}
  ); // 初始化对象
  // map 把所有节点挂上 chidren
  for (const item of list) {
    if (item.pid === 0) {
      res.push(item);
      continue; // 根节点处理
    }

    if (item.pid in map) {
      const parent = map[item.pid];
      parent.children = parent.children || []; // 置空
      parent.children.push(item); // 推入节点
    }
  }
}
