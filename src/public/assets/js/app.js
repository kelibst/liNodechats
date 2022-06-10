const socket = io();
const msgForm = document.getElementById("msgForm");
const locGet = document.getElementById("loc");
const $messages = document.querySelector("#messages");

// Templates
const msgTmp = document.querySelector("#msgTmp").innerHTML;
const locTmp = document.querySelector("#locTmp").innerHTML;
const sidebarTmp = document.querySelector("#sideMenu").innerHTML;

const { chatname, chatroom } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.on("locationMsg", (data) => {
  const curUser = JSON.parse(localStorage.getItem("user"));

  let curUsername = curUser.username === data.username ? "Me" : data.username;
  const url = `https://google.com/maps?q=${data.cordinate.latitude},${data.cordinate.longitude}`;
  const html = Mustache.render(locTmp, {
    username: curUsername,
    url: url,
    createdAt: moment(data.createdAt).format("hh:mm a"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

socket.on("message", (data) => {
  const curUser = JSON.parse(localStorage.getItem("user"));

  let curUsername = curUser.username === data.username ? "Me" : data.username;
  const html = Mustache.render(msgTmp, {
    username: curUsername,
    message: data.text,
    createdAt: moment(data.createdAt).format("hh:mm a"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render(sidebarTmp, {
    room,
    users,
  });

  document.querySelector("#sidebar").innerHTML = html;
});

msgForm.addEventListener("submit", (e) => {
  e.preventDefault();
  e.target[1].setAttribute("disabled", "disabled");
  const message = e.target[0].value;
  socket.emit("sendMessage", message, (receiver) => {
    e.target[1].removeAttribute("disabled");
    e.target[0].value = "";
    e.target[0].focus();
  });
});

locGet.addEventListener("click", () => {
  locGet.setAttribute("disabled", "disabled");
  if (!navigator.geolocation) {
    return alert("Geoloaction is not suppoerted by your browser");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    locGet.removeAttribute("disabled");
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        console.log("location was sent");
      }
    );
  });
});

socket.emit("join", { chatname, chatroom }, (error, user) => {
  if (error) {
    alert(error);
    return (location.href = "/");
  }

  localStorage.setItem("user", JSON.stringify(user));
});
