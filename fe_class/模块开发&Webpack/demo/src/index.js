function test(content) {
  document.querySelector("#app").innerHTML = content;
}

test("something");

// 开发模式的包在内存中，不输出 memory-fs webpack 内部数线了一套对内存的读写机制
