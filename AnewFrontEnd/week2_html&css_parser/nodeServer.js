// 第九课作业
const http = require("http");
// const Buffer = require('buffer');

http
  .createServer((request, response) => {
    let body = [];
    request
      .on("error", err => {
        console.error(err); // 错误捕获
      })
      .on("data", chunk => {
        body.push(chunk);
        // body.push(chunk.toString());
      })
      .on("end", () => {
        // console.log('body', body);
        body = Buffer.concat([Buffer.from(body)]).toString();
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<title></title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script type="text/javascript">
</script>
<style type="text/css">
</style>
</head>
<body>
<div><img class="cscs" /></div>
<div><img id="cs" /></div>
</body>
</html>\n`);
      });
  })
  .listen(8088);

console.log("server started ");
