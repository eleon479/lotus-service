const express = require('express');
const router = express.Router();
const { pool } = require('../middleware/pg');

const movesDb = [
  {
    moveId: 1,
    userId: 1,
    userTag: 'eleon479',
    title: 'Tesla Earnings Short',
    symbol: 'TSLA',
    description: '(insert insider trading here)',
    //tags: ['short', 'earnings', 'musk'],
    entry: 273.5,
    target: 250.0,
    performance: 11.25
  },
  {
    moveId: 2,
    userId: 2,
    userTag: 'wsb',
    title: 'Micron Box Spread',
    symbol: 'MU',
    description: "It's risk free money.",
    //tags: ['margin', 'call'],
    entry: 27.75,
    target: 50.0,
    performance: -20.0
  },
  {
    moveId: 3,
    userId: 2,
    userTag: 'wsb',
    title: 'Boeing Rebound',
    symbol: 'BA',
    description: 'Stock sold off pretty hard last week - momentum play.',
    //tags: ['bounce', '737', 'swing'],
    entry: 391.5,
    target: 430.0,
    performance: -12.73
  }
];

router.get('/', (req, res) => {
  res.send(movesDb); // remove

  const query = 'SELECT * FROM moves;'
  const movePromise = new Promise((resolve, reject) => {
    pool.query(query, (error, result) => {
      if (error) {
        reject();
      }
      resolve(result.rows);
    });
  });

  // use promise here

});

router.get('/:moveId', (req, res) => {
  const moveId = Number(req.params.moveId);
  let movesResult = movesDb.find(move => move.moveId === moveId);

  res.send(movesResult);
});

router.get('/user/:userId', (req, res) => {
  const userId = Number(req.params.userId);
  let movesResult = movesDb.filter(move => move.userId === userId);

  res.send(movesResult);
});

module.exports = router;
