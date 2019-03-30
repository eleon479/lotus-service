// core express app import
const express = require('express');
const app = express();

// 3rd party middleware imports
const morgan = require('morgan');
const helmet = require('helmet');

// lotus middleware and routes
const cors = require('./middleware/cors');
const lotusClient = require('./middleware/pg');
const users = require('./routes/users');
const moves = require('./routes/moves');

// lotus external routes
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
