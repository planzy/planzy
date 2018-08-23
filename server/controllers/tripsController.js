const db = require('../db/index');

const tripsController = {
  getTrips: (req, res) => {
    const query = `SELECT * FROM trips WHERE user_id = $1`;
    const values = [req.params.id];
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
    const values = [req.body.tripId];
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
  viewTrip: (req, res) => {
    const query = `select trips.id as "tripId", trips.name as "tripName", 
      destinations.id as "destId", destinations.name as "destName",
      destinations.lat as "destLat", destinations.lon as "destLon",
      list_items.name as "listItemName"
      from list_items
      join destinations on destinations.id = list_items.dest_id
      join trips on trips.id = destinations.trip_id
      where trips.id = $1`
    const values = [req.body.tripId];
    db.query(query, values, (err, results) => {
      if (err) {
        res.status(400).json({
          viewTrip: 'FAILED',
          reason: err.message
        });
      } else {
        res.json(results.rows);
      }
    });
  }
}

module.exports = tripsController;