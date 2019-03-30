// core express app import
const express = require('express');
const app = express();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

pool.connect()
  .then(client => {

    return client.query('SELECT * FROM users;')
      
      .then(res => {
        client.release();
        console.log(res.rows);
      })
      
      .catch(e => {
        client.release();
        console.error('Error in nested pool promise: ', e);
      });

  })
  .catch(e => {
    pool.end();
    console.log('Error in connecting pool');
  });

// 3rd party middleware imports
const morgan = require('morgan');
const helmet = require('helmet');

// lotus middleware and routes
const cors = require('./middleware/cors');
/*const lotusClient = require('./middleware/pg');*/
const users = require('./routes/users');
const moves = require('./routes/moves');
const prices = require('./routes/ext/prices');
const quotes = require('./routes/ext/quotes');
const charts = require('./routes/ext/charts');

// set up third party middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// set up lotus middleware
app.use(cors);
app.use('/api/users', users);
app.use('/api/moves', moves);
app.use('/api/ext/prices', prices);
app.use('/api/ext/quotes', quotes);
app.use('/api/ext/charts', charts);

// start the node server
const SERVER_PORT = process.env.PORT || 3000;
const SERVER_HOST = '0.0.0.0';
const server = app.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log('======================================');
  console.log(`Now listening on port ${SERVER_PORT}!`);
  console.log('======================================');

  // try {
  //   lotusClient.connect();
  //   console.log(' - - - - Database Connection Established - - - -');
  // } catch {
  //   console.log('Error - Could not connect to database.');
  // }
});

// lotusClient.disconnect();
