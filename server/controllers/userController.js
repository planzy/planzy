const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db/index');

const SECRET = process.env.JWT_SECRET;
const TTL = Number(process.env.JWT_TTL_SECONDS);

const newToken = sub => ({
  sub,
  iss: 'Planzy',
  exp: Math.floor(Date.now() / 1000) + TTL,
});

function sendError(code, reason) {
  this.status(code).json({
    login: 'FAILED',
    reason,
  });
}

function logError(err) {
  console.error(`${err.name}: ${err.message}`);
}

module.exports = {
  signIn: async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      sendError.call(res, 400, 'Bad input');
      return;
    }
    try {
      const query = 'SELECT password FROM users WHERE username = $1';
      const values = [username];
      const result = await db.query(query, values);
      const valid = await bcrypt.compare(password, result.rows[0].password);
      if (!valid) throw new Error('Invalid password');
      res.locals.username = username;
      next();
    } catch (err) {
      logError(err);
      sendError.call(res, 400, 'Incorrect username or password.');
    }
  },

  startSession: (req, res) => {
    jwt.sign(
      newToken(res.locals.username),
      SECRET,
      (err, token) => {
        if (err) {
          sendError.call(res, 400, err.message);
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

  addUser: async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      sendError.call(res, 400, 'Bad input');
      return;
    }
    try {
      const hash = await bcrypt.hash(password, 10);
      const values = [username, hash];
      const query = 'INSERT INTO users (username, password) VALUES($1, $2) RETURNING *';
      await db.query(query, values);
      res.locals.username = username;
      next();
    } catch (err) {
      logError(err);
      sendError.call(res, 400, "Couldn't create an account. Please try again later.");
    }
  },
};
