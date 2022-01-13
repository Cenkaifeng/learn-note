const fs = require("fs");
const http = require("http");
const path = require("path");

const resovlePath = require("resolve-path");
http
  .createServer(function (req, res) {
    try {
      const rootDir = path.join(__dirname, "static");
      const file = resolvePath(rootDir, req.url);

      fs.readFile(file, function (err, data) {
        if (err) {
          return err;
        }

        res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        res.end(data);
      });
    } catch (e) {
      console.log(e);
      res.writeHead(404, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(`找不到对应资源:${file}`);
    }
  })
  .listen(8081);

console.log("server is listening on port 8081");
