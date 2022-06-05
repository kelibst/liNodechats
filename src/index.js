const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const hbs = require("hbs");
const socketio = require("socket.io");
const { generateMsg, generateLoc } = require("./utils/message");
const { addUser, removeUser, getUser } = require("./utils/users");
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
  socket.on("join", ({ chatname, chatroom }, callback) => {
    const { error, user } = addUser({
      id: socket.id,
      username: chatname,
      room: chatroom,
    });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);
    socket.broadcast
      .to(user.room)
      .emit("message", generateMsg(`${user.username} has joined!`));
    io.emit("message", generateMsg("Welcome"));
  });

  socket.on("sendLocation", (data, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("locationMsg", generateLoc(user.username, data));
    callback();
  });
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", generateMsg(user.username, message));
    callback("Delivered");
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        generateMsg(user.username + " just left the chat")
      );
    }
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
