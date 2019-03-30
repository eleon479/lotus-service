const { Client } = require('pg');

// establish connection
function connect() {
  if (!process.env.DATABASE_URL) throw err;

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });

  client.connect();

  const sampleQuery = 'SELECT * FROM useres WHERE id = 1;';

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

// CRUD operations
function insert() {} // Create
function select() {} // Read
function update() {} // Update
function remove() {} // Delete

// end connection
function close() {}

module.exports = { connect };
