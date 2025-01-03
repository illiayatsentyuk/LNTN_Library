const User = require('../models/user');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

exports.getLogin = (req, res, next) => {
  res.render('login-register/login-page', {
    pageTitle: 'Login',
    errors: false,
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.getSignup = (req, res, next) => {
  res.render('login-register/register-page', {
    pageTitle: 'Register',
    errors: false,
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postSignup = (req, res, next) => {
  const errors = { isError: false };
  const username = req.body.loginformname;
  if (username.trim().length === 0) {
    errors['name'] = { errorType: 'Username is required' };
    errors.isError = true;
  }
  const password = req.body.loginformpassword;
  if (password.trim().length === 0) {
    errors['password'] = { errorType: 'Password is required' };
    errors.isError = true;
  }
  const email = req.body.loginformemail;
  if (!validator.isEmail(email)) {
    errors['email'] = { errorType: 'Enter valid email' };
    console.log(errors.email);
    errors.isError = true;
  }
  User.find({ name: username })
    .then((users) => {
      if (users.length > 0) {
        errors['name'] = { errorType: 'Username already exist' };
        errors.isError = true;
        res.render('login-register/register-page', {
          pageTitle: 'Register',
          errors: errors,
          isAuthenticated: req.session.isLoggedIn,
        });
        throw new Error('Username already exist');
      } else if (errors.isError) {
        res.render('login-register/register-page', {
          pageTitle: 'Register',
          errors: errors,
          isAuthenticated: req.session.isLoggedIn,
        });
        throw new Error('Some errors');
      } else {
        return bcryptjs.hash(password, 12);
      }
    })
    .then((passowrd) => {
      console.log(passowrd);
      const newUser = new User({
        name: username,
        password: passowrd,
        email: email,
      });
      return newUser.save();
    })
    .then((result) => {
      res.redirect('/login');
    })
    .catch((err) => {});
};

exports.postLogin = (req, res, next) => {
  const errors = {};
  const email = req.body.loginformemail;
  if (email.trim().length === 0) {
    errors['email'] = { errorType: 'Email is required' };
  }
  const password = req.body.loginformpassword;
  if (password.trim().length === 0) {
    errors['password'] = { errorType: 'Password is required' };
  }

  if (!isEmpty(errors)) {
    res.render('login-register/login-page', {
      pageTitle: 'Login',
      errors: errors,
      isAuthenticated: req.session.isLoggedIn,
    });
  } else {
    User.find({ email: email })
      .then((user) => {
        if (user.length > 0) {
          userFromDb = user[0];
          return bcryptjs.compare(password, userFromDb.password);
        } else {
          errors['name'] = { errorType: 'No such user' };
          res.render('login-register/login-page', {
            pageTitle: 'Login',
            errors: errors,
            isAuthenticated: req.session.isLoggedIn,
          });
          throw new Error('No user');
        }
      })
      .then((result) => {
        if (result) {
          console.log(req.session);
          req.session.isLoggedIn = true;
          req.session.user = userFromDb;
          req.session.save(() => {
            res.redirect('/');
          });
        } else {
          errors['password'] = { errorType: 'Wrong password' };
          res.render('login-register/login-page', {
            pageTitle: 'Login',
            errors: errors,
            isAuthenticated: req.session.isLoggedIn,
          });
          throw new Error('Wrong password');
        }
      })
      .catch((err) => {});
  }
};
exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};
