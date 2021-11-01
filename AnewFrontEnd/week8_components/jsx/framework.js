export function createElement(type, attributes, ...children) {
  let element;

  if (typeof type === "string") {
    element = document.createElement(type);
  } else {
    element = new ElementWrapper(type);
  }
  for (let name in attributes) {
    element.setAttribute(name, attributes[name]);
  }
  for (let child of children) {
    if (typeof child === "string") {
      child = new TextWrapper(child);
    }
    element.appendChild(child);
  }
  return;
}

class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(child) {
    this.root.appendChild(child);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}
class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(child) {
    this.root.appendChild(child);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}
