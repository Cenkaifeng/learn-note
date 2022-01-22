const net = require("net");

const server = net.createServer(function (socket) {
  socket.on("data", function (data) {
    socket.write("server:hello");
  });
  socket.on("end", function () {
    console.log("客户端关闭");
  });
  // TODO: 人为粘包操作
});

server.on("error", function (err) {
  console.log(err);
});
server.listen(8089);
