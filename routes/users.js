const express = require('express');
const router = express.Router();
const { pool, getUsers } = require('../middleware/pg');

router.get('/', (req, res) => {
  getUsers()
    .then((results) => { res.send(results); })
    .catch((errors) => { res.send([]) });
});

router.get('/:userId', (req, res) => {

  const userId = Number(req.params.userId);
  const query = `SELECT * FROM users WHERE id = ${userId};`;
  const userPromise = new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) reject();
      resolve(results);
    });
  });

  let userResult = [];
  
  userPromise
    .then(results => userResult = results)
    .catch(error => userResult = [])
    .finally(res.send(userResult));

});

module.exports = router;
