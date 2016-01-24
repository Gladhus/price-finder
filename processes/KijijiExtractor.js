var Q = require('q');
var _ = require('lodash');
var kijiji = require('kijiji-scraper');

function keywordsBuilder(request, language){

  var keywords = request.languages[language].keywords;

  var queryString = keywords[0];

  for(var i = 1; i < keywords.length; ++i){
    queryString += '+';
    queryString += keywords[i];
  }

  return queryString;

}

function normalize(data) {
  var cleanedAd = {
    link : data.link,
    title : data.title,
    pubDate : data.pubDate,
    image : data.innerAd.image,
    description : data.innerAd.desc,
    price : parseFloat(data.innerAd.info.Prix.replace(' ', '').replace('$','').replace(',','.'))
  }

  return cleanedAd;
}

function extract(request) {

  var deferred = Q.defer();

  kijiji.query({'locationId':request.region}, {'minPrice':0, 'keywords':keywordsBuilder(request, 'french')}, function(err, ads) {

    var cleanedData = [];

    console.log(ads);

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
