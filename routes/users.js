const express = require('express');
const router = express.Router();
const { pool } = require('../services/pgstore');
const auth = require('../middleware/auth');

// fetch all users
router.get('/', auth, (req, res) => {
  const query = 'select * from users;';
  const userPromise = new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) reject();
      resolve(results.rows);
    });
  });

  userPromise
    .then(results => {
      res.send(results);
    })
    .catch(() => {
      res.send([]);
    });
});

// fetch specific user
router.get('/:userId', auth, (req, res) => {
  const userId = Number(req.params.userId);
  const query = `SELECT * FROM users WHERE id = ${userId};`;
  const userPromise = new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) reject();
      resolve(results.rows);
    });
  });

  userPromise
    .then(ok => {
      res.send(ok[0]);
    })
    .catch(() => {
      res.send([]);
    });
});

module.exports = router;
