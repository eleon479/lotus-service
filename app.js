// core express and database pool imports
const express = require('express');
const { pool } = require('./middleware/pg'); // change to /services ?
const app = express();

// 3rd party middleware imports
const morgan = require('morgan');
const helmet = require('helmet');

// set up third party middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// lotus middleware and routes
const cors = require('./middleware/cors');
const users = require('./routes/users');
const moves = require('./routes/moves');
const prices = require('./routes/ext/prices');
const quotes = require('./routes/ext/quotes');
const charts = require('./routes/ext/charts');

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
const WELCOME_MSG = '='.repeat(40) + `\nNow listening on port ${SERVER_PORT}!\n` + '='.repeat(40) + '\n';

const server = app.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(WELCOME_MSG);
  console.log('Running in: ' + process.env.NODE_ENV + ' mode.');
});