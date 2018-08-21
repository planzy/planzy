module.exports = {
  signIn: (req, res, next) => {
    res.cookie('sid', 'foo!');
    res.status(200).json({ login: 'OK' });
  },

  signUp: (req, res, next) => {
    res.cookie('sid', 'foo...');
    res.status(201).json({ login: 'OK' });
    next();
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

  addUser: (req, res) => {
    const query = `INSERT INTO users (username, password) VALUES($1, $2) RETURNING *`;
    const values = [req.body.username, req.body.password];
    db.query(query, values, (err, results) => {
      if (err) {
        res.status(400).send(json({
          login: 'FAILED',
          reason: err.message,
        }));
      } else {
        next();
      }
    });
  }
};
