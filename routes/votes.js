const express = require('express');
const router = express.Router();
const { pool } = require('../services/pgstore');

// create a new vote
router.post('/', (req, res) => {
  const userId = Number(req.body.userId);
  const postId = Number(req.body.postId);
  const voteType = String(req.body.voteType);
  const query = `insert into votes (userid, postid, type) values (${userId}, ${postId}, ${voteType});`;
  const votePromise = new Promise((resolve, reject) => {
    pool.query(query, (err, result) => {
      if (err) reject();
      resolve(result);
    });
  });

  votePromise.then(ok => res.send({ status: 'SUCCESS' })).catch(er => res.send({ status: 'FAILED' }));
});

module.exports = router;
