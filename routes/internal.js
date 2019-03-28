const express = require('express');
const router = express.Router();

/* MDN Mongoose Tutorial
//Connecting to MongoDB
var mongoose = require('mongoose');
var mongoDB = 'mongodb://heroku_v4jbn81z:e2e0vpgq0nefkhpclcu9e4ccht@ds139979.mlab.com:39979/heroku_v4jbn81z';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Defining Schemas
var Schema = mongoose.Schema;
var SomeModelSchema = new Schema({
  someString: String,
  someDate: Date
});

//Creating a Model
var SomeModel = mongoose.model('SomeModel', SomeModelSchema);
*/

const mongoose = require('mongoose');
let lotusMongoURI = 'mongodb://heroku_v4jbn81z:e2e0vpgq0nefkhpclcu9e4ccht@ds139979.mlab.com:39979/heroku_v4jbn81z';

mongoose.connect(lotusMongoURI, { useNewUrlParser: true });
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  
  // Create move schema
  let moveSchema = mongoose.Schema({
    moveId: Number,
    userId: Number,
    userTag: String,
    title: String,
    symbol: String,
    description: String,
    tags: Array,
    entry: Number,
    target: Number,
    performance: Number
  });

  // Store move documents in a collection called "moves"
  let Move = mongoose.model('moves', moveSchema);

  // Create seed data
  let someMove = new Move({
    moveId: 1,
    userId: 1, 
    userTag: 'eleon479',
    title: 'Tesla Earnings Short',
    symbol: 'TSLA',
    description: '(insert insider trading here)',
    tags: ['short', 'earnings', 'musk'],
    entry: 273.50,
    target: 250.00,
    performance: 11.25
  });

  let randomMove = new Move({
    moveId: 2,
    userId: 2, 
    userTag: 'wsb',
    title: 'Micron Box Spread',
    symbol: 'MU',
    description: 'It\'s risk free money.',
    tags: ['margin', 'call'],
    entry: 27.75,
    target: 50.00,
    performance: -20.00
  });

  let anotherMove = new Move({
    moveId: 3,
    userId: 2, 
    userTag: 'wsb',
    title: 'Boeing Rebound',
    symbol: 'BA',
    description: 'Stock sold off pretty hard last week - momentum play.',
    tags: ['bounce', '737', 'swing'],
    entry: 391.50,
    target: 430.00,
    performance: -12.73
  });

  let moveList = [someMove, randomMove, anotherMove];

  /* quarantine: 1000% spaghetti callback hell */
  Move.insertMany(moveList).then(() => {
    return Move.updateOne({ moveId: 2 }, { $set: { userTag: 'wsb' } });
  }).then(() => {
    // value in object arg for the sort method: 1-> ASC, -1->DESC
    return Move.find({ performance: { $lte: 0.00 } }).sort({ performance: 1 });
  }).then(docs => {
    docs.forEach(doc => {
      logStr = `tag->${doc['userTag']} + title->${doc['title']} + symbol->${doc['symbol']} + entry->${doc['entry']} + net->${doc['performance']}`;
      console.log(logStr);
    });
  }).then(() => {
    return mongoose.connection.db.collection('moves').drop();
  }).then(() => {
    return mongoose.connection.close();
  }).catch(err => {
    console.log(err);
  });
  /* quarantine */

});

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