const db = require('../db/index');

const destinationsController = {
  getDestinations: (req, res) => {
    const query = `SELECT * FROM destinations WHERE trip_id=${req.body.trip_id}`;
    db.query(query, '', (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results.rows);
      }
    });
  },
  addDestination: (req, res) => {
    const query = `
      INSERT INTO destinations (name, trip_id, lat, lon, sequence) VALUES($1, $2, $3, $4, $5) RETURNING *
    `;
    const values = [req.body.name, req.body.trip_id, req.body.lat, req.body.lon, req.body.sequence];
    db.query(query, values, (err, results) => {
      if (err) {
        res.status(400).json({
          addDest: 'FAILED',
          reason: err.message,
        });
      } else {
        res.status(200).send(results.rows);
      }
    });
  },
  deleteDestination: (req, res) => {
    const query = `DELETE FROM destinations WHERE id=${req.body.dest_id}`;
    db.query(query, '', (err, results) => {
      if (err) {
        res.status(400).json({
          deleteDest: "FAILED",
          reason: err.message
        });
      } else {
        res.json(results.rows);
      }
    });
  }
}

module.exports = destinationsController;
