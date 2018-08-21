const db = require('../db/index');

const tripsController = {
  getTrips: (req, res) => {
    const query = `SELECT * FROM trips WHERE user_id=${req.body.userId}`;
    db.query(query, '', (err, results) => {
      if (err) res.send(err);
      res.json(results.rows);
    });
  },
  addTrip: (req, res) => {
    const query = 'INSERT INTO trips (user_id, name) VALUES($1, $2) RETURNING *';
    const values = [`${req.body.userId}`, `${req.body.name}`];
    db.query(query, values, (err, results) => {
      if (err) res.send(err);
      res.json(results.rows);
    });
  }
}

module.exports = tripsController;