const express = require('express');
const router = express.Router();
const { getUsers } = require('../middleware/pg');

router.get('/', (req, res) => {
  getUsers()
    .then((results) => { res.send(results); })
    .catch((errors) => { res.send([]) });
});

router.get('/:userId', (req, res) => {
  const userId = Number(req.params.userId);
  const userResult = userDb.find(user => user.userId === userId);

  res.send(userResult);
});

module.exports = router;
