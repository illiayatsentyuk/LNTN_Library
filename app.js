const express = require("express");

const app = express();

const path = require("path");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.get("/login", (req, res) => {
  res.render("login-page", {
    title: "123",
  });
});

// mongoDb

app.listen(3001);
console.log("trttr");
