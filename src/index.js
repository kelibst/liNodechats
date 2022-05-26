const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const hbs = require("hbs");
const socketio = require("socket.io");
const { SocketAddress } = require("net");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3002;
const publicDir = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./public/assets/views");
const partials = path.join(__dirname, "./public/assets/partials");

app.use(cors());
// app.use(express.json());

app.use(express.static(publicDir));

// app.set("view engine", "hbs");
// app.set("views", viewsPath);
// hbs.registerPartials(partials);

io.on("connection", (socket) => {
  // console.log("New connnection innitialize");
  socket.broadcast.emit("message", "A new user has joined!");
  socket.on("sendLocation", (coords, callback) => {
    io.emit(
      "locationMsg",
      `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
    );
    callback();
  });
  socket.on("sendMessage", (message, callback) => {
    io.emit("message", message);
    callback("Delivered");
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user just left the chat");
  });
});

app.get("", (req, res) => {
  res.render("index", {
    title: "RealTime Chat Application",
  });
});

server.listen(port, () => {
  console.log("Server is running on port " + port);
});
