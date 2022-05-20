const express = require("express");
const path = require("path");
const cors = require("cors");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3002;
const publicDir = path.join(__dirname, "./src/public");
const viewsPath = path.join(__dirname, "./public/assets/views");
const partials = path.join(__dirname, "./public/assets/partials");

app.use(cors());
app.use(express.json());

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partials);

app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "RealTime Chat Application",
  });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
