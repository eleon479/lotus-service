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
const PORT = 3000;

//const LOCAL_IP = '192.168.1.191';
const LOCAL_IP = 'localhost';

app.listen(PORT, LOCAL_IP, () => {
  console.log('======================================')
  console.log(`Now listening via ${LOCAL_IP}:${PORT}!`)
  console.log('======================================')
});