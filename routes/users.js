const express = require('express');
const router = express.Router();
const { pool, getUsers } = require('../services/pgstore');

router.get('/', (req, res) => {

  const query = 'select * from users;';
  const userPromise = new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) reject();
      resolve(results.rows);
    });
  });

  userPromise
  .then((results) => { res.send(results); })
  .catch((errors) => { res.send([]) });

});

router.get('/:userId', (req, res) => {

  const userId = Number(req.params.userId);
  const query = `SELECT * FROM users WHERE id = ${userId};`;
  const userPromise = new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) reject();
      resolve(results.rows);
    });
  });
  
  userPromise
    .then((ok) => {res.send(ok[0])})
    .catch((e) => {res.send([])});

});

module.exports = router;
