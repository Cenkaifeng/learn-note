module.exports = {
  input: "./src/index.js",
  output: [
    {
      dir: "./dist/cjs",
      // file: "./dist/index-cjs.js",
      format: "cjs",
    },
    {
      dir: "./dist/amd",
      // file: "./dist/index-amd.js",
      format: "amd",
    },
    {
      dir: "./dist/esm",
      // file: "./dist/index-esm.js",
      format: "es",
    },
    // not support code spliting ❓  npm run build 会报错
    // {
    //   dir: './dist/iife',
    //   // file: "./dist/index-iife.js",
    //   format: "iife",
    // },
    // {
    //   dir: './dist/umd',
    //   // file: "./dist/index-umd.js",
    //   format: "umd",
    //   name: 'res'
    // }
  ],
  // 因为 iife 和 umd 打包出来是一样的他们都放在一个文件里，iife 是不能够被切分的
  // code splitting // 代码切分按需加载 按需加载的本质就是利用Promise (看 cjs/index.js)
  // plugins,
};
// 要用多文件导出需要把 file 注释掉
