// JSON.parse(JSON.stringify(obj))

function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) {
    return null;
  }

  if (obj instanceof Date) {
    return new Date(obj);
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  // if
}
