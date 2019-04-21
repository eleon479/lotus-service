const express = require('express');
const router = express.Router();
const { pool } = require('../services/pgstore');

// get all posts
router.get('/', (req, res) => {
  const userId = req.query.userId;
  const allPostsQuery =
    'SELECT posts.*, users.tag, users.firstname, users.avatar FROM posts JOIN users ON users.id = posts.userid WHERE NOT removed ORDER BY ts DESC;';
  const userPostsQuery = `SELECT posts.*, users.tag, users.firstname, users.avatar FROM posts JOIN users ON users.id = ${userId} WHERE NOT removed ORDER BY ts DESC;`;

  const query = userId ? userPostsQuery : allPostsQuery;
  const postPromise = new Promise((resolve, reject) => {
    pool.query(query, (err, result) => {
      if (err || result.rows < 1) reject();
      resolve(result.rows);
    });
  });

  postPromise
    .then(ok => {
      res.send(ok);
    })
    .catch(() => {
      res.send([]);
    });
});

// get a specific post
router.get('/:postId', (req, res) => {
  const postId = Number(req.params.postId);
  const query = `SELECT posts.*, users.firstname, users.lastname, users.tag, users.avatar FROM posts JOIN users ON users.id = posts.userid WHERE posts.id = ${postId} WHERE NOT removed ORDER BY ts DESC;`;
  const postPromise = new Promise((resolve, reject) => {
    pool.query(query, (err, result) => {
      if (err) reject();
      resolve(result.rows);
    });
  });

  postPromise
    .then(ok => {
      res.send(ok[0]);
    })
    .catch(() => {
      res.send({});
    });
});

module.exports = router;
