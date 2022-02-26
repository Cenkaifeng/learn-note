const net = require("net");
const socket = new net.Socket();

socket.connect(8080, "localhost");
socket.on("connect", function (data) {
  socket.write("connect server");
  // TODO: 人为粘包操作
  socket.cork();
  socket.write("1");
  socket.write("2");
  socket.write("3");
  soket.uncork();
  // socket.end();
});

socket.on("data", function (data) {
  console.log(data.toString());
  setTimeout(() => {
    socket.end();
  }, 1000);
});

socket.on("error", function (error) {
  console.log(error);
});
