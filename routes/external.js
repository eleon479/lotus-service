const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('external API');
});

router.get('/price/:symbol', (req, res) => {

  let url = makeURI(req.params.symbol, 'price');
  let priceResponse = new Promise((resolve, reject) => {
    request.get(url, function (error, response, body) {
      try {
        let clean = JSON.parse(body);
        resolve({
          ticker: req.params.symbol,
          price: clean,
          valid: true
        });
      } catch {
        reject();
      }
    })
  });

  priceResponse
    .then(result => res.send( result ))
    .catch(err => res.send({ ticker: req.params.symbol, price: -1, valid: false }))

});

router.get('/price/:symbol', (req, res) => {

  let url = makeURI(req.params.symbol, 'price');

  request.get(url, function (error, response, body) {
    try {
      let clean = JSON.parse(body);
      res.send(body);
    } catch {
      console.log('[WARN] -> IEX Price -> Bad Response!');
      let r = -1;
      res.send(200, -1);
    }
  });


});

router.get('/quote/:symbol', (req, res) => {
  let url = makeURI(req.params.symbol, 'quote');
  request.get(url, function (error, response, body) {
    try {
      let clean = JSON.parse(body);
      res.send(clean);
    } catch {
      console.log('[WARN] -> IEX Quote -> Bad Response!');
      res.send({ latestPrice: -1, changePercent: -1 });
    }
  });
});

router.get('/chart/:symbol', (req, res) => {
  let url = makeURI(req.params.symbol, 'chart');
  request.get(url, function (error, response, body) {
    try {
      let clean = JSON.parse(body);
      let stockChartSeries = clean.map((slice) => {
        return {
          value: slice.close || 420,
          name: slice.label || 'n/a'
        };
      });
      res.send(stockChartSeries);
    } catch {
      console.log('[WARN] -> IEX Chart -> Bad Response!');
      res.send([
        { value: -1, name: 'api_err' }
      ]);
    }
  });
});

/* helper functions */
function makeURI(symbol, action) {1

  // temporary - will probably be deprecated soon 
  // and replaced by iexcloud API (~June 1st, 2019)
  let uri = 'https://api.iextrading.com/1.0/stock';

  if (action === 'chart') {
    let range = '1y';
    uri += `/${symbol}/chart/${range}`
  } else if (action === 'quote') {
    uri += `/${symbol}/quote/`;
  } else if (action === 'price') {
    uri += `/${symbol}/price/`;
  }

  return uri;
}

module.exports = router