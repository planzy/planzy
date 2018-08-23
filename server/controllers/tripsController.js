const db = require('../db/index');

const serializeTrip = (rows) => {
  const trip = [];

  rows.forEach((row) => {
    if (!trip[row.destId]) {
      trip[row.destId] = {
        id: row.destId,
        name: row.tripName,
        lat: row.destLat,
        lng: row.destLon,
        items: [],
      };
    }

    trip[row.destId].items.push({
      id: row.listItemId,
      text: row.listItemName,
    });
  });

  // remove empty elements from array
  return trip.filter(Boolean);
};

const tripsController = {
  getTrips: (req, res) => {
    const query = `
    SELECT trips.id, trips.name, username FROM trips FULL OUTER JOIN users on users.id = trips.user_id WHERE users.id = $1 
    `;
    const values = [res.locals.id];
    db.query(query, values, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ username: results.rows[0].username, trips: results.rows });
      }
    });
  },
  addTrip: (req, res) => {
    const query = 'INSERT INTO trips (user_id, name) VALUES($1, $2) RETURNING *';
    const values = [res.locals.id, req.body.name];
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
    const query = `SELECT trips.id as "tripId", trips.name as "tripName",
      destinations.id as "destId", destinations.name as "destName",
      destinations.lat as "destLat", destinations.lon as "destLon",
      list_items.id as "listItemId", list_items.name as "listItemName"
      FROM list_items
      JOIN destinations on destinations.id = list_items.dest_id
      join trips on trips.id = destinations.trip_id
      WHERE trips.id = $1`
    const values = [req.params.tripId];
    db.query(query, values, (err, results) => {
      if (err) {
        res.status(400).json({
          viewTrip: 'FAILED',
          reason: err.message
        });
      } else {
        res.json(serializeTrip(results.rows));
      }
    });
  }
}

module.exports = tripsController;
