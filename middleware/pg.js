/*
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
