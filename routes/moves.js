const express = require('express');
const router = express.Router();
const { pool } = require('../services/pgstore');

// get all moves
router.get('/', (req, res) => {

  const userId = req.query.userId;
  const allMovesQuery = 'select * from moves;';
  const userMovesQuery = `select * from moves where userId = ${userId};`;
  const query = userId ? userMovesQuery : allMovesQuery;
  const movePromise = new Promise((resolve, reject) => {
    pool.query(query, (err, result) => {
      if (err) reject();
      resolve(result.rows);
    });
  });

  movePromise
    .then((ok) => { res.send(ok) })
    .catch((er) => { res.send([]) });

});

// get a specific move
router.get('/:moveId', (req, res) => {

  const moveId = Number(req.params.moveId);
  const query = `select * from moves where id = ${moveId};`;
  const movePromise = new Promise((resolve, reject) => {
    pool.query(query, (err, result) => {
      if (err) reject();
      resolve(result.rows);
    });
  });

  movePromise
    .then((ok) => { res.send(ok[0]) })
    .catch((er) => { res.send({}) });

});

module.exports = router;
