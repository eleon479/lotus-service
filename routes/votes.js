const express = require('express');
const router = express.Router();
const { pool } = require('../services/pgstore');

// get all votes
router.get('/', (req, res) => {
  const query = 'select * from votes;';
  const votePromise = new Promise((resolve, reject) => {
    pool.query(query, (err, result) => {
      if (err) reject();
      resolve(result.rows);
    });
  });

  votePromise
    .then(ok => {
      res.send(ok);
    })
    .catch(() => {
      res.send([]);
    });
});

// create a new vote
router.post('/', (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  const voteType = req.body.voteType;

  const query = `insert into votes (userid, postid, type) values ( ${userId}, ${postId}, '${voteType}' );`;
  const votePromise = new Promise((resolve, reject) => {
    pool.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });

  votePromise
    .then(ok => {
      res.send({ status: 'SUCCESS' });
    })
    .catch(er => {
      res.send({ status: 'FAILED' });
    });
});

module.exports = router;
