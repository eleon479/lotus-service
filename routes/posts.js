const express = require('express');
const router = express.Router();
const { pool } = require('../services/pgstore');

// get all posts
router.get('/', (req, res) => {

  const userId = req.query.userId;
  const allPostsQuery = 'SELECT posts.id, posts.title, posts.contents, users.firstname, users.lastname, users.tag, users.avatar FROM posts JOIN users ON users.id = posts.userid;';
  const userPostsQuery = `SELECT posts.id, posts.title, posts.contents, users.firstname, users.lastname, users.tag, users.avatar FROM posts JOIN users ON users.id = posts.userid WHERE posts.userid = ${userId};`;
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
  const query = `SELECT posts.id, posts.title, posts.contents, users.firstname, users.lastname, users.tag, users.avatar FROM posts JOIN users ON users.id = posts.userid WHERE posts.id = ${postId};`;
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
