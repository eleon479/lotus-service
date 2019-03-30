const express = require('express');
const request = require('request');
const helpers = require('../../middleware/helpers');
const router = express.Router();

router.get('/:symbol', (req, res) => {
  const symbol = req.params.symbol;
  const action = 'price';
  const url = helpers.uri(symbol, action);

  request.get(url, function(error, response, body) {
    try {
      let clean = JSON.parse(body);
      res.send(body);
    } catch {
      res.send(200, -1);
    }
  });
});

router.get('/quote/:symbol', (req, res) => {
  const symbol = req.params.symbol;
  const action = 'quote';
  const url = helpers.uri(symbol, action);

  request.get(url, function(error, response, body) {
    try {
      let clean = JSON.parse(body);
      res.send(clean);
    } catch {
      res.send({
        latestPrice: -1,
        changePercent: -1
      });
    }
  });
});

module.exports = router;
