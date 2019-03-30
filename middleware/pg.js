const Pool = require('pg').Pool;

const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: true
};

const pool = new Pool(config);

pool.on('connect', (client) => {
  console.log('!!! client connected to the Database !!!');
});

pool.on('acquire', (client) => {
  console.log('!!! client acquired(?) !!!');
});

pool.on('remove', (client) => {
  console.log('!!! client removed !!!');
  // process.exit(0);
});

pool.on('error', (err, client) => {
  console.error('!!! Unexpected error on idle client !!!', err);
  client.release(err);
  process.exit(-1);
});


/*
  Usage (example):

  let userList = null;

  getUsers()
    .then(results => userList = results;)
    .catch(errors => userList = []; console.log('error!') );
*/
const getUsers = () => {

  let query = 'select * from users;';

  const userPromise = new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) reject();
      resolve(results.rows);
    });
  });

  return userPromise;
}

module.exports = { pool, getUsers };

/* pool example using promises 
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

// unrelated previous attempt - could be useful
// in terms of class structure and encapsulation?

const { Client } = require('pg');

let lotusDatabase = {
  openConnection: false,

  client: new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }),

  connect() {
    if (!process.env.DATABASE_URL) {
      throw err;
    } else {
      this.client.connect();
    }
  },

  query(queryString) {
    let userQuery = 'SELECT * FROM users;';
    this.client.query(queryString, callbackFn);
    this.client.end();
  },

  disconnect() {
    this.client.end();
  }
};

module.exports = lotusDatabase;
*/