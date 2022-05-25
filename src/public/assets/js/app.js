const socket = io();
const msgForm = document.getElementById("msgForm");
const locGet = document.getElementById("loc");
const $messages = document.querySelector("#messages");

// Templates
const msgTmp = document.querySelector("msgTmp".innerHTML);

socket.on("message", (msg) => {
  console.log(msg);
  const html = Mustache.render(msgTmp);
  $messages.insertAdjacentElement("beforeend", html);
});

msgForm.addEventListener("submit", (e) => {
  e.preventDefault();
  e.target[1].setAttribute("disabled", "disabled");
  const message = e.target[0].value;
  socket.emit("sendMessage", message, (res) => {
    e.target[1].removeAttribute("disabled");
    e.target[0].value = "";
    e.target[0].focus();
    console.log("The message was delivered!", res);
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
