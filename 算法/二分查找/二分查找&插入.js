function binarySearch(arr, value, start = 0, end = arr.length) {
  if (start >= end) {
    return start;
  }
  let mid = Math.floor((start + end) / 2);

  let midValue = arr[mid];

  if (value === midValue) {
    return mid;
  } else if (value > midValue) {
    return binarySearch(arr, value, mid + 1, end);
  } else {
    return binarySearch(arr, value, start, mid);
  }
}

// while 循环解法（性能更好点...
function sort(list, val) {
  let left = 0,
    right = list.length;
  while (left < right) {
    let mid = (right + left) >> 1;
    let value = list[mid];
    if (value === val) {
      return mid;
    } else if (value > val) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left + 1;
}
