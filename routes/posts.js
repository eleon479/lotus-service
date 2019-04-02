const express = require('express');
const router = express.Router();
const { pool } = require('../services/pgstore');

// get all posts
router.get('/', (req, res) => {

    const query = 'select posts.title, posts.contents, users.firstname, users.lastname, users.tag, users.avatar from posts join users on users.id = posts.userid;';
    const postPromise = new Promise((resolve, reject) => {
        pool.query(query, (err, result) => {
            if (err || result.rows < 1) reject();
            resolve(result.rows);
        });
    });

    postPromise
        .then((ok) => { res.send(ok) })
        .catch(() => { res.send([]) });

});

module.exports = router;