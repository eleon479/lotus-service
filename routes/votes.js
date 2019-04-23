const express = require('express');
const router = express.Router();
const { pool } = require('../services/pgstore');
const auth = require('../middleware/auth');

// get all votes
router.get('/', auth, (req, res) => {
  const userId = Number(req.query.userId);
  const userVotesQuery = `select * from votes where userid = ${userId};`;
  const allVotesQuery = 'select * from votes;';

  const query = userId ? userVotesQuery : allVotesQuery;
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
router.post('/', auth, (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  const voteType = req.body.voteType;

  const query = `insert into votes (userid, postid, votetype) values ( ${userId}, ${postId}, '${voteType}' );`;
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
