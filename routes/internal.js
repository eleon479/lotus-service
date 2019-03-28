const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('internal API');
});

const accDB = [
  {
    userId: 1,
    firstName: 'Eddy',
    lastName: 'Leon',
    tag: 'eleon479',
    avatar: 'avatar2',
    accId: 'j5brhkl2e9j0l7'
  }
];

router.get('/user/:accId', (req, res) => {

  let accountLookup = req.params.accId;
  let accountResult = accDB.find(acc => acc.accId === accountLookup);

  res.send(accountResult);
});

const movesDB = [
  {
    moveId: 3,
    userId: 1,
    userTag: 'eleon479',
    title: 'volatility roulette pt.3',
    symbol: 'vxxb',
    description: 'betting it all on vol spike and chaos.',
    tags: ['VXXB', 'short', 'volatility', 'gamble'],
    entry: 29.95,
    target: 35.00
  },
  {
    moveId: 7,
    userId: 1,
    userTag: 'eleon479',
    title: 'tim aapl',
    symbol: 'aapl',
    description: 'abchdb dd.. !!d fsdfk3',
    tags: ['AAPL', 'long', 'lov', 'timmy'],
    entry: 101.01,
    target: 202.02
  },
  {
    moveId: 10,
    userId: 3,
    userTag: 'cheekboi18',
    title: 'CCClap some cheeks',
    symbol: 'v',
    description: 'ccm sfdsmsmmms? yeet.',
    tags: ['V', 'nondirectional', 'ambivalent', 'rekt'],
    entry: 53.44,
    target: 53.44
  }
];

router.get('/moves/:userTag', (req, res) => {
  let userTag = req.params.userTag;
  let results = movesDB.filter(move => move.userTag === userTag);

  res.send(results);
});

module.exports = router;