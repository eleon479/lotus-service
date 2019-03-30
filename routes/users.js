const express = require('express');
const router = express.Router();
const lotusClient = require('../middleware/pg');

router.get('/', (req, res) => {
  let userQuery = 'SELECT * FROM users;';
  //let userResult = [];

  lotusClient.query(userQuery, (qerr, qres) => {
    if (qerr) throw qerr;
    // for ( ... ) { }
    res.send(qres.rows);
  });

  //res.send(userDb);
});

router.get('/:userId', (req, res) => {
  const userId = Number(req.params.userId);
  const userResult = userDb.find(user => user.userId === userId);

  res.send(userResult);
});

module.exports = router;
