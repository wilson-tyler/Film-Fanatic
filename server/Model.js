const { Pool } = require('pg');
const PG_URI = `postgres://ehweiiwq:${process.env.DB_KEY}@peanut.db.elephantsql.com/ehweiiwq`;

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('Query: ', text);
    return pool.query(text, params, callback);
  }
}