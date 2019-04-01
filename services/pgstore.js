const Pool = require('pg').Pool;

// import loaded environment settings from config
const config = require('../config/pgconfig');

// set up pool of client connections to postgres database
const pool = new Pool(config);

// handle various client events
// (log to console for now)
pool.on('connect', () => { console.log('[pg] client connected') });
pool.on('acquire', () => { console.log('[pg] client acquired') });
pool.on('remove', () => { console.log('[pg] client removed') });
pool.on('error', (err) => {
  console.error('[pg] client error: ', err);
  process.exit(-1);
});

// expose pool object for routes to query
module.exports = { pool };