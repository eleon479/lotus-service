const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { pool } = require('../services/pgstore');
const jwt = require('jsonwebtoken');

function hasToken() {}
function checkToken() {}

router.get('/check', (req, res) => {
  const token = req.header('x-auth-token');

  if (!token)
    return res.send({ validToken: false, reason: 'No token sent.' });

  console.log(`Received x-auth-token: ${token}`);

  try {
    const decoded = jwt.verify(token, process.env.LOTUS_JWTPK);
    return res.send({ validToken: true, reason: 'Token is fine!' });
  } catch (ex) {
    console.log('Exception: ', ex)
    return res.send({ validToken: false, reason: 'Provided token is not valid.' });
  }
});

router.post('/', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const errorMessage = 'Invalid email/password combination.';
  const errorResponse = () => res.status(400).send(errorMessage);

  if (!email || !password) {
    res.status(400).send('Missing email or password.');
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

      if (!validPass) {
        console.log(`pass not valid - validPass state: ${validPass}`);
        res.status(400).send(errorMessage);
      }

      const token = jwt.sign({ id: account.id }, process.env.LOTUS_JWTPK);

      res.send({
        lotusAccountToken: token
      });
    })
    .catch(er => {
      res.status(400).send(errorMessage);
    });
});

module.exports = router;
