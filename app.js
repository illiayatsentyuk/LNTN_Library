const express = require("express");

const app = express();

const path = require("path");
const libraryRoute = require("./routes/library");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(libraryRoute);

app.get("/", (req, res) => {
    res.render("search-books/search-books", {
        pageTitle: "Search Book",
    });
});
// mongoDb

app.listen(3001);
console.log("trttr");
