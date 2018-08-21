const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;
const TTL = Number(process.env.JWT_TTL_SECONDS);

const newToken = sub => ({
  sub,
  iss: 'Planzy',
  exp: Math.floor(Date.now() / 1000) + TTL,
});

module.exports = {
  signIn: (req, res, next) => {
    next();
  },

  signUp: (req, res, next) => {
    next();
  },

  startSession: (req, res) => {
    jwt.sign(
      newToken(req.body.username),
      SECRET,
      (err, token) => {
        if (err) {
          return res.status(400).json({
            login: 'FAILED',
            reason: err.message,
          });
        }
        res.cookie('session', token);
        return res.status(201).json({ login: 'OK' });
      },
    );
  },

  checkSession: (req, res, next) => {
    if (!req.cookies.session) {
      return res.redirect('/login');
    }
    return jwt.verify(
      req.cookies.session,
      SECRET,
      (err, decoded) => {
        if (err) {
          return res.redirect('/login');
        }
        res.locals.username = decoded.sub;
        return next();
      },
    );
  },

  renderLogin: (req, res) => {
    res.send("Here's the login page!");
  },
};
