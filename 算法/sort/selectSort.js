/**
 * O(n^2)
 */

function selectSort(arr) {
    const len = arr.length;
    let minIndex; // 定义minIndex, 缓存当前区间最小值索引

    for ( let i = 0; i < len - 1; i ++) {
        // i 作为排序区间起点

        minIndex = i;

        // i, j 分别定义当前区间左右边界 i: 左; j: 右;

        for( let j = i ; j < len ; j ++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
    }

    // 如果minIndex 对应元素不是目前的头部元素，则交换两者

    if ( minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }

    return arr;
}