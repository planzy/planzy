const db = require('../db/index');

const destinationsController = {
  getDestinations: (req, res) => {
    const query = `SELECT * FROM destinations WHERE trip_id=${req.body.userId}`
  }
}

module.exports = destinationsController;
