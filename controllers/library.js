exports.getIndex = (req, res, next) => {
  res.render('index', {
    pageTitle: 'Home page',
    isAuthenticated: req.session.isLoggedIn,
  });
};
