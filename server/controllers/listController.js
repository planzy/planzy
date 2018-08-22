const db = require('../db/index');

const listController = {
  getListItems: (req, res) => {
    const query = 'SELECT * FROM list_items WHERE dest_id = $1';
    const values = [req.params.id]
    db.query(query, values, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results.rows);
      }
    });
  },
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
  },
  deleteListItem: (req, res) => {
    const query = 'DELETE FROM list_items WHERE id = $1';
    const values = [req.body.dest_id]
    db.query(query, values, (err, results) => {
      if (err) {
        res.status(400).json({
          deleteListItem: "FAILED",
          reason: err.message
        });
      } else {
        res.json(results.rows);
      }
    });
  },
};

module.exports = listController;