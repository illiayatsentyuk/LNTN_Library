const User = require("../models/user");

exports.loginUser = (req, res, next) => {
  res.render("login-register/login-page", {
    pageTitle: "Login",
  });
};

exports.registerUser = (req, res, next) => {
  res.render("login-register/register-page", {
    pageTitle: "Register",
  });
};

exports.createUser = (req, res, next) => {
  const username = req.body.loginformname;
  const password = req.body.loginformpassword;
  const age = req.body.loginformage;
  console.log(req.body);
  const user = new User(username, password, age);
  user.save();
  res.redirect("/login");
};

exports.findUser = (req, res, next) => {
  const username = req.body.loginformname;
  const password = req.body.loginformpassword;
  User.findUser(username, password, user => {
    res.send(user);
  });
};
