const express = require('express');
const router = express.Router();

const userDb = [
  {
    userId: 1,
    tag: 'eleon479',
    firstName: 'Eddy',
    lastName: 'Leon',
    avatar: 'avatar2'
  },
  {
    userId: 2,
    tag: 'wsb',
    firstName: 'Walt',
    lastName: 'Streebets',
    avatar: 'avatar6'
  }
];

router.get('/', (req, res) => {
  res.send(userDb);
});

router.get('/:userId', (req, res) => {
  const userId = Number(req.params.userId);
  const userResult = userDb.find(user => user.userId === userId);

  res.send(userResult);
});

module.exports = router;
