var express = require('express');
var router = express.Router();
var RequestHandler = require('../processes/RequestHandler');

router.get('/', function(req, res) {
  res.render('index', { title: 'Price Finder' });
});

router.post('/PFRequest', function(req, res) {
  RequestHandler
    .execute(req.body)
    .then(function(data) {
      res.send(data);
    });
});

module.exports = router;
