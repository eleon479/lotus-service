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
  query(queryString, callbackFn) {
    this.client.connect();
    this.client.query(queryString, callbackFn);
    this.client.end();
  },
  disconnect() {
    this.client.end();
  }
};

/*
function connect(client) {
  if (!process.env.DATABASE_URL) throw err;

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });

  client.connect();

  const sampleQuery = 'SELECT * FROM users WHERE id = 1;';

  client.query(sampleQuery, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    console.log('closing connection...');
    client.end();
    console.log('connectiong ended');
  });
}
*/

module.exports = lotusDatabase;
