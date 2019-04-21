const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { pool } = require('../services/pgstore');

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

  const query = `SELECT password FROM accounts WHERE email = '${email}';`;
  const accountPromise = new Promise((resolve, reject) => {
    pool.query(query, (err, result) => {
      if (err) reject(err);
      if (result.rows.length < 1) reject(new Error(errorMessage));
      resolve(result);
    });
  });

  accountPromise
    .then(async ok => {
      const validPass = await bcrypt.compare(password, ok.rows[0].password);
      //if (!validPass) res.status(400).send(errorMessage);
      if (!validPass) errorResponse();
      res.send(true);
    })
    .catch(er => {
      //res.status(400).send(errorMessage);
      errorResponse();
    });
});

module.exports = router;
