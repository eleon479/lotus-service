const Pool = require('pg').Pool;
const config = require('../config/pgconfig');
const pool = new Pool(config);

pool.on('connect', (client) => {
  console.log('!!! client connected to the Database !!!');
});

pool.on('acquire', (client) => {
  console.log('!!! client acquired(?) !!!');
});

pool.on('remove', (client) => {
  console.log('!!! client removed !!!');
});

pool.on('error', (err, client) => {
  console.error('!!! Unexpected error on idle client !!!', err);
  process.exit(-1);
});

module.exports = { pool };