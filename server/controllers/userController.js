module.exports = {
  signIn: (req, res) => {
    res.cookie('sid', 'foo!');
    res.status(200).json({ login: 'OK' });
  },

  signUp: (req, res) => {
    res.cookie('sid', 'foo...');
    res.status(201).json({ login: 'OK' });
  },

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
