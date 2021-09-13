const fs = require("fs");
const http = require("http");
const path = require("path");

http
  .createServer(function (req, res) {
    const file = path.join(__dirname, "static", req.url);

    fs.readFile(file, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain;charset=utf-8" });
        res.end(`找不到对应资源:${file}`);
        return;
      }

      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(data);
    });
  })
  .listen(8080);

console.log("server is listening on port 8080");

// localhost:8080/?/../../../ 通过输入相对路径获取到服务器的资源
