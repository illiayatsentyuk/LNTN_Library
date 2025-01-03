const express = require('express');

const app = express();

const path = require('path');
const libraryRoute = require('./routes/library');
const authRoute = require('./routes/auth');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGODB_URI = 'mongodb://localhost:27017/library';

const User = require("./models/user");

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(authRoute);
app.use(libraryRoute);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log('server is up');
    app.listen(3000);
  })
  .catch((err) => {});
