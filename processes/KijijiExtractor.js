var Q = require('q');
var _ = require('lodash');
var kijiji = require('kijiji-scraper');

var request = {
  region : 80002,
  target : ['kijiji'],
  languages : {
    french : {
      keywords : ['Cle', 'USB', '16GB'],
      tags : ['kingston'],
      categories : ['electronique', 'composantes', 'informatique']
    },
    english : {
      keywords : ['USB', 'Key', '16GB'],
      tags : ['kingston'],
      categories : ['electronics', 'components', 'computer']
    }
  }
}

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
  console.log(data.innerAd.info.Prix);
  var cleanedAd = {
    link : data.link,
    title : data.title,
    pubDate : data.pubDate,
    image : data.innerAd.image,
    description : data.innerAd.desc,
    price : data.innerAd.info.Prix
  }

  return cleanedAd;
}

function extract(request) {

  var deferred = Q.defer();

  kijiji.query({'locationId':request.region}, {'minPrice':0, 'keywords':keywordsBuilder(request, 'french')}, function(err, ads) {

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

extract(request)
  .then(function(data) {/*console.log(data)*/});
