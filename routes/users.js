const express = require('express');
const router = express.Router();
//const lotusClient = require('../middleware/pg');

router.get('/', (req, res) => {
  res.send([]);

  // lotusClient.fetchUsers();
});

router.get('/:userId', (req, res) => {
  const userId = Number(req.params.userId);
  const userResult = userDb.find(user => user.userId === userId);

  res.send(userResult);
});

module.exports = router;
