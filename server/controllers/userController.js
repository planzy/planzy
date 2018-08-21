module.exports = {
  checkLogin: (req, res, next) => {
    if (!req.cookies.sid) {
      return res.redirect('/login');
    }
    return next();
  },

  renderLogin: (req, res) => {
    res.send("Here's the login page!");
  },
};
