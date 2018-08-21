const db = require('../db/index');

const listController = {
  addListItem: (req, res) => {
    const query = 'INSERT INTO list_items (dest_id, name, sequence) VALUES($1, $2, $3) RETURNING *'
    const values = [req.body.dest_id, req.body.name, req.body.sequence];
    db.query(query, values, (err, results) => {
      if (err) {
        res.status(400).json({
          addList: 'FAILED',
          reason: err.message,
        });
      } else {
        res.status(200).send(results.rows);
      }
    });
  }
};

module.exports = listController;