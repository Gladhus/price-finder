var _ = require('lodash');
var math = require('mathjs');

function buildPriceRanges(data, prices) {

  var priceRanges = {
    0:{
      min: 0,
      max: 0,
      ads: []
    },
    1:{
      min: 0,
      max: 0,
      ads: []
    },
    2:{
      min: 0,
      max: 0,
      ads: []
    },
    3:{
      min: 0,
      max: 0,
      ads: []
    },
    4:{
      min: 0,
      max: 0,
      ads: []
    }
  };

  var priceRangeCount = 5;
  var minPrice = math.min(prices);
  var maxPrice = math.max(prices);
  var priceDifference = ((maxPrice - minPrice) / priceRangeCount);

  priceRanges[0].min = minPrice + priceDifference*0;
  priceRanges[0].max = minPrice + priceDifference*1;
  priceRanges[1].min = minPrice + priceDifference*1;
  priceRanges[1].max = minPrice + priceDifference*2;
  priceRanges[2].min = minPrice + priceDifference*2;
  priceRanges[2].max = minPrice + priceDifference*3;
  priceRanges[3].min = minPrice + priceDifference*3;
  priceRanges[3].max = minPrice + priceDifference*4;
  priceRanges[4].min = minPrice + priceDifference*4;
  priceRanges[4].max = minPrice + priceDifference*5;

  _.each(data, function(item) {
    priceRanges[Math.floor(item.price / (priceDifference + minPrice))].ads.push(item);
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
      ranges: buildPriceRanges(_.orderBy(unitedData,'price'), prices)
    };

}

module.exports = {compile:compile};
