const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: connectionString
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}