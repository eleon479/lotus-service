const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { pool } = require('../services/pgstore');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const errorMessage = 'Invalid email/password combination.';
  const missingResponse = () => res.send('Missing email or password.');
  const errorResponse = () => res.send(errorMessage);

  if (!email || !password) {
    // res.status(400).send('Missing email or password.');
    missingResponse();
  }

  const query = `SELECT * FROM accounts WHERE email = '${email}';`;
  const accountPromise = new Promise((resolve, reject) => {
    pool.query(query, (err, result) => {
      if (err) reject(err);
      if (result.rows.length < 1) reject(new Error(errorMessage));
      resolve(result.rows[0]);
    });
  });

  accountPromise
    .then(async account => {
      const validPass = await bcrypt.compare(password, account.password);
      //if (!validPass) res.status(400).send(errorMessage);
      if (!validPass) errorResponse();

      const token = jwt.sign({ id: account.id }, process.env.LOTUS_JWTPK);
      res.send(token);
    })
    .catch(er => {
      //res.status(400).send(errorMessage);
      errorResponse();
    });
});

module.exports = router;
