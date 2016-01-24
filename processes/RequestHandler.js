var _ = require('lodash');
var Q = require('Q');
var KijijiExtractor = require('../processes/KijijiExtractor');
var EbayExtractor = require('../processes/EbayExtractor');
var StatCompiler = require('../processes/StatCompiler');

function execute(request, callback){
  var extractorPromises = [];

  _.each(request.targets, function(target) {

    switch (target) {
      case 'kijiji':
        extractorPromises.push(KijijiExtractor.extract(request));
        break;
      case 'ebay':
        extractorPromises.push(EbayExtractor.extract(request));
        break;
      default:
    }

  });

  return Q.all(extractorPromises)
    .then(StatCompiler.compile);
}

module.exports = {
  execute: execute
};
