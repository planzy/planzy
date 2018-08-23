const bluebird = require('bluebird');
const jwt = bluebird.promisifyAll(require('jsonwebtoken'));
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
      const query = 'SELECT * FROM users WHERE username = $1';
      const values = [username];
      const result = await db.query(query, values);
      const valid = await bcrypt.compare(password, result.rows[0].password);
      if (!valid) throw new Error('Invalid password');
      res.locals.id = result.rows[0].id;
      next();
    } catch (err) {
      logError(err);
      sendError.call(res, 400, 'Incorrect username or password.');
    }
  },

  startSession: async (req, res) => {
    try {
      const token = await jwt.sign(newToken(res.locals.id), SECRET);
      res.cookie('session', token, { httpOnly: true });
      res.status(201).json({ login: 'OK' });
    } catch (err) {
      sendError.call(res, 400, err.message);
    }
  },

  checkSession: async (req, res, next) => {
    if (!req.cookies.session) {
      res.redirect('/login');
      return;
    }
    try {
      const decoded = await jwt.verify(req.cookies.session, SECRET);
      res.locals.id = decoded.sub;
      next();
    } catch (err) {
      res.redirect('/login');
    }
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
      const result = await db.query(query, values);
      res.locals.id = result.rows[0].id;
      next();
    } catch (err) {
      logError(err);
      sendError.call(res, 400, "Couldn't create an account. Please try again later.");
    }
  },
};
