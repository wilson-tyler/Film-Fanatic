const { Pool } = require('pg');
const PG_URI = '';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('Query: ', text);
    return pool.query(text, params, callback);
  }
}