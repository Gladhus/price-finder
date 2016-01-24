var _ = require('lodash');
var math = require('mathjs');

function buildPriceRanges(data, prices) {

  var priceRanges = {
    0:[],
    1:[],
    2:[],
    3:[],
    4:[]
  };

  var priceRangeCount = 5;
  var minPrice = math.min(prices);
  var maxPrice = math.max(prices);
  var priceDifference = ((maxPrice - minPrice) / priceRangeCount);

  _.each(data, function(item) {
    priceRanges[Math.floor(item.price / (priceDifference + minPrice))].push(item);
  });

  return priceRanges;
}

function compile(data) {

    var unitedData = _.flatten(data);
    var prices = _.map(unitedData, 'price');

    return {
      median: math.median(prices),
      mean: math.mean(prices),
      max: math.max(prices),
      min: math.min(prices),
      count: prices.length,
      ranges: buildPriceRanges(unitedData, prices)
    };

}

module.exports = {compile:compile};
