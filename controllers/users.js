const User = require('../models/user');
const validator = require('validator');

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

exports.loginUser = (req, res, next) => {
  res.render('login-register/login-page', {
    pageTitle: 'Login',
    errors: false,
  });
};

exports.registerUser = (req, res, next) => {
  res.render('login-register/register-page', {
    pageTitle: 'Register',
    errors: false,
  });
};

exports.createUser = (req, res, next) => {
  const errors = {};
  const username = req.body.loginformname;
  if (username.trim().length === 0) {
    errors['name'] = { errorType: 'Username is required' };
  }

  const password = req.body.loginformpassword;
  if (password.trim().length === 0) {
    errors['password'] = { errorType: 'Password is required' };
  }

  const age = req.body.loginformage;
  if (age.split('.').length > 1) {
    errors['age'] = { errorType: 'Age is float' };
  } else if (age <= 0) {
    errors['age'] = { errorType: 'Age must be grater then 0' };
  }
  if (!isEmpty(errors)) {
    console.log(errors);
    res.render('login-register/register-page', {
      pageTitle: 'Register',
      errors: errors,
    });
  } else if (username.trim().length > 1) {
    User.findUserByName(username, (user) => {
      if (user) {
        errors['name'] = { errorType: 'Username already exist' };
        res.render('login-register/register-page', {
          pageTitle: 'Register',
          errors: errors,
        });
      } else {
        const user = new User(username, password, age);
        user.save();
        res.redirect('/login');
      }
    });
  }
};

exports.findUser = (req, res, next) => {
  const errors = {};
  const username = req.body.loginformname;
  if (username.trim().length === 0) {
    errors['name'] = { errorType: 'Username is required' };
  }
  const password = req.body.loginformpassword;
  if (password.trim().length === 0) {
    errors['password'] = { errorType: 'Password is required' };
  }

  if (!isEmpty(errors)) {
    res.render('login-register/login-page', {
      pageTitle: 'Title',
      errors: errors,
    });
  } else {
    User.findUser(username, password, (user) => {
      if (user.message === 'password') {
        errors['password'] = { errorType: 'Wrong password' };
        res.render('login-register/login-page', {
          pageTitle: 'Login',
          errors: errors,
        });
      } else if (user.message === 'no-user') {
        errors['name'] = { errorType: 'No such user' };
        res.render('login-register/login-page', {
          pageTitle: 'Login',
          errors: errors,
        });
      } else {
        res.send(user);
      }
    });
  }
};
