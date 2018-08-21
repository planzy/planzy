const { Pool } = require('pg');
// require('dotenv').config();
// const connectionString = process.env.DATABASE_URL;
const connectionString = 'postgres://fxgllgcs:X7cLtPmvQt4fp4RlT4OeZwscq3wd1xrR@stampy.db.elephantsql.com:5432/fxgllgcs';
const pool = new Pool({
  connectionString: connectionString
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}