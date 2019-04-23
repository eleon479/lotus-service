const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// headers and logging middleware
app.use(helmet());
app.use(morgan('tiny'));

// load environment config
dotenv.config();

// lotus middleware and routes
const cors = require('./middleware/cors');
const login = require('./routes/login');
const accounts = require('./routes/accounts');
const users = require('./routes/users');
const posts = require('./routes/posts');
const moves = require('./routes/moves');
const votes = require('./routes/votes');
const prices = require('./routes/ext/prices');
const quotes = require('./routes/ext/quotes');
const charts = require('./routes/ext/charts');

// set up lotus middleware
app.use(cors);
app.use('/api/login', login);
app.use('/api/accounts', accounts);
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/moves', moves);
app.use('/api/votes', votes);
app.use('/api/ext/prices', prices);
app.use('/api/ext/quotes', quotes);
app.use('/api/ext/charts', charts);

// start the node server
const SERVER_PORT = process.env.PORT;
const SERVER_HOST = '0.0.0.0';
const WELCOME_MSG = '='.repeat(40) + `\nNow listening on port ${SERVER_PORT}!\n` + '='.repeat(40) + '\n';

const server = app.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(WELCOME_MSG);
  console.log('Running in: ' + process.env.NODE_ENV + ' mode.');
});
