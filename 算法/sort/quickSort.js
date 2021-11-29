// 快速排序

function quickSort(arr) {
  if (arr.length <= 1) return arr;
  // 如果是乱序的话...用0 作为 midkey 这个标的也是可以的。
  return quickSort(arr.filter(e => e < arr[0]))
    .concat(arr.filter(e => e === arr[0])) // 防止偶数参数死循环
    .concat(quickSort(arr.filter(e => e > arr[0])));
}
