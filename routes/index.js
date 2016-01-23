var express = require('express');
var router = express.Router();


/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Price Finder' });
});

router.post('/PFRequest', function(req, res) {
	console.log(req.body);
});

router.post('/clarifai', function(req, res) {

});

module.exports = router;
