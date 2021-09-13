const a = document.getElementsByTagName("a")[0];

const queryObject = {};

const search = window.location.search;

search.replace(/([^&=?]+)=([^&]+)/g, (m, $1, $2) => {
  queryObject[$1] = decodeURIComponent($2);
});
console.log(queryObject);

a.href = queryObject.redirectUrl;

// url 里不能写太多脚本，但是通过url 加载远程脚本运行来实现攻击还是可以做到的

// var script = document.createElement("script");
// script.type = "text/javascript";
// script.async = true;
// script.src = "remote.js";
// var s = document.getElementsByTagName("script")[0];
// s.parentNode.insertBefore(script, s);

// 实际攻击最大可能是一个cdn链接 替换 remote.js
