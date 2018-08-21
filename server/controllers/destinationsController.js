const db = require('../db/index');

const destinationsController = {
  getDestinations: (req, res) => {
    const query = `SELECT * FROM destinations WHERE trip_id=${req.body.userId}`
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
  }
}

module.exports = destinationsController;
