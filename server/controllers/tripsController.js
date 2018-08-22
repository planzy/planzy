const db = require('../db/index');

const tripsController = {
  getTrips: (req, res) => {
    const query = `SELECT * FROM trips WHERE user_id = $1`;
    const values = [req.body.userId];
    db.query(query, values, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results.rows);
      }
    });
  },
  addTrip: (req, res) => {
    const query = 'INSERT INTO trips (user_id, name) VALUES($1, $2) RETURNING *';
    const values = [req.body.user_id, req.body.name];
    db.query(query, values, (err, results) => {
      if (err) {
        res.status(400).json({
          addTrip: 'FAILED',
          reason: err.message,
        });
      } else {
        res.json(results.rows);
      }
    });
  },
  deleteTrip: (req, res) => {
    const query = 'DELETE FROM trips WHERE id = $1';
    const values = [req.body.trip_id];
    db.query(query, values, (err, results) => {
      if (err) {
        res.status(400).json({
          deleteTrip: "FAILED",
          reason: err.message
        });
      } else {
        res.json(results.rows);
      }
    });
  },
}

module.exports = tripsController;