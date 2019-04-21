const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { pool } = require('../services/pgstore');

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

module.exports = router;
