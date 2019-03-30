const { Client } = require('pg');

// establish connection
function connect() {
  if (!process.env.DATABASE_URL) throw err;

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });

  client.connect();
  client.query(
    'SELECT table_schema,table_name FROM information_schema.tables;',
    (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
      client.end();
    }
  );
}

// CRUD operations
function insert() {} // Create
function select() {} // Read
function update() {} // Update
function remove() {} // Delete

// end connection
function close() {}

module.exports = { connect };
