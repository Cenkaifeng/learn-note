const net = require("net");
const socket = new net.Socket();

socket.connect(8080, "localhost");
socket.on("connect", function (data) {
  socket.write("connect server");
  socket.end();
});

socket.on("data", function (data) {
  console.log(data.toString());
});

socket.on("error", function (error) {
  console.log(error);
});
