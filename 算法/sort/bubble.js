//冒泡排序

/* O(n^2)
*/

function bubbleSort(arr) {
    const len = arr.length;

    for( let i = 0; i < len; i ++) {
        for (let j = 0; j < len - 1; j ++) {
            if ( arr[i] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j+1], arr[j]];
            }
        }
    }

    return arr;
}

