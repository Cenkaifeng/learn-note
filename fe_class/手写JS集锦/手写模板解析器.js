// 给 string 对象添加一个 render(obj) 方法。
// 实现字符串中的特定字符串替换obj的对应属性

var greeting = "My name is ${name}, age ${age}, I am a ${job.jobName}";

var employee = {
  name: "XiaoMing",
  age: 11,
  job: {
    jobName: "designer",
    jobLevel: "senior",
  },
};
// 解正则
String.prototype.render = function (obj) {
  return this.replace(/\$\{(.*?)\}/g, (match, key) => {
    if (key.match(".")) {
      return key.split(".").reduce((prev, curr, currIndex, arr) => {
        return prev[curr];
      }, obj);
    }
    return obj[key];
  });
};

var result = greeting.render(employee);
console.log(result); // My name is XiaoMing, age 11, I am a designer;

// 其他还有一些 用 eval with 这种语法的解法，感觉都和回字有几种写法差不多
