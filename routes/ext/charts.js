const express = require('express');
const request = require('request');
const helpers = require('../../middleware/helpers');
const router = express.Router();

router.get('/:symbol', (req, res) => {
  const symbol = req.params.symbol;
  const action = 'chart';
  const url = helpers.uri(symbol, action);

  request.get(url, function(error, response, body) {
    try {
      let clean = JSON.parse(body);
      let stockChartSeries = clean.map(seriesItem => {
        return {
          value: seriesItem.close || -1,
          name: seriesItem.label || 'ope'
        };
      });

      res.send(stockChartSeries);
    } catch {
      const badResponse = [{ value: -1, name: 'api_err' }];
      res.send(badResponse);
    }
  });
});

module.exports = router;
