const express = require('express');
const app = express();

// 3rd party 
const morgan = require('morgan');
const helmet = require('helmet');

// app structure
const cors = require('./middleware/cors');
const internal = require('./routes/internal');
const external = require('./routes/external');

// other middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// app middleware
app.use(cors);
app.use('/api/in', internal);
app.use('/api/ex', external);

// start the server
const SERVER_PORT = process.env.PORT || 3000;
const SERVER_HOST = '0.0.0.0';
const server = app.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log('======================================')
  console.log(`Now listening on port ${SERVER_PORT}!`)
  console.log('======================================')
});

process.title = 'lotusService';
process.on('SIGTERM', () => {
  // handle graceful shutdown here
  server.close(() => {
    console.log('Server shut off.');
  });
});