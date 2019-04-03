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
  const userId = Number(req.body.userId);
  const postId = Number(req.body.postId);
  const voteType = String(req.body.voteType);

  console.log(`userId: ${userId}`);
  console.log(`postId: ${postId}`);
  console.log(`voteType: ${voteType}`);

  const query = `insert into votes (userid, postid, type) values (${userId}, ${postId}, ${voteType});`;
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
      console.log('rejected promise in /votes, postgres query err: ');
      console.log(er);
      res.send({ status: 'FAILED' });
    });
});

module.exports = router;
