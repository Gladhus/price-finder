var express = require('express');
var router = express.Router();
var PFPool = require('./processes/PFPool');

/* GET home page. */

router.get('/', function(req, res) {

  var dataExtracter = PFPool.getDataExtractor();

  console.log(dataExtracter.pid);

  res.render('index', { title: 'Express' });
});

module.exports = router;
