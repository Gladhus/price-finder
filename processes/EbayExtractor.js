var request = require('request');
var Q = require('q');
var _ = require('lodash');

function normalize(data) {

  var cleanedAd = {
    link : data.viewItemURL[0],
    title : data.title[0],
    pubDate : null,
    image : data.galleryURL[0],
    description : null,
    price : parseFloat(data.sellingStatus[0].convertedCurrentPrice[0].__value__) // The price has to be a float
  }

  return cleanedAd;
}

function keywordsBuilder(request, language){

  var keywords = request.languages[language].keywords;
  return keywords.join('%20');
}

function extract(data) {

  var deferred = Q.defer();

  var url = "http://svcs.ebay.com/services/search/FindingService/v1"
    + "?OPERATION-NAME=findItemsByKeywords"
    + "&SERVICE-VERSION=1.0.0"
    + "&SECURITY-APPNAME=FrancisB-5995-4ffa-a7c3-0b2589483ad7"
    + "&GLOBAL-ID=EBAY-ENCA"
    + "&RESPONSE-DATA-FORMAT=JSON"
    + "&callback=_cb_findItemsByKeywords"
    + "&REST-PAYLOAD"
    + "&keywords=" + keywordsBuilder(request, 'english')
    + "&paginationInput.entriesPerPage=100";

  request.get(url, function(error, response, body) {

    var queryResult = JSON.parse(body.substring(0, body.length - 1).substring('/**/_cb_findItemsByKeywords('.length));
    var ads = queryResult.findItemsByKeywordsResponse[0].searchResult[0].item;
    var cleanedData = [];

    _.each(ads, function(ad, index, array) {

      cleanedData[index] = normalize(ad);

      if(index == array.length - 1) deferred.resolve(cleanedData);
    });

  });

  return deferred.promise;

}

module.exports = {
  extract: extract
}
