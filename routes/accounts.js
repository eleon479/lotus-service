const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { pool } = require('../services/pgstore');
const auth = require('../middleware/auth');

// create new account
router.post('/', async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (username && email && password) {
    // implement more comprehensive validation here...
  } else {
    res.send({ status: 'INVALID', token: null });
  }

  const pwhash = await bcrypt.hash(password, 10);
  const query = `INSERT INTO accounts (username, email, password) VALUES ('${username}', '${email}', '${pwhash}');`;
  const accountPromise = new Promise((resolve, reject) => {
    pool.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });

  accountPromise
    .then(ok => {
      res.send({ status: 'OK', token: '???' });
    })
    .catch(er => {
      res.send({ status: 'BAD', token: null });
    });
});

// fetch account data
router.get('/', auth, (req, res) => {
  res.send('Coming Soon | GET /accounts/:id');
});

// modify account data
router.put('/', auth, (req, res) => {
  res.send('Coming Soon | PUT /accounts/:id');
});

// remove account
router.delete('/', auth, (req, res) => {
  res.send('Coming Soon | DELETE /accounts/:id');
});

module.exports = router;
