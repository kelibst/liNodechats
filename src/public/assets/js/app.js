const socket = io();

socket.on("message", (msg) => {
  console.log(msg);
});

document.getElementById("msgForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const message = e.target[0].value;
  socket.emit("sendMessage", message);
});

document.getElementById("loc").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geoloaction is not suppoerted by your browser");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit("sendLocation", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  });
});
