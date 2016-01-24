var Q = require('q');
var _ = require('lodash');
var kijiji = require('kijiji-scraper');


/**
 * Function that builds the keywords query string.
 * The Kijiji api's taking a string with every keywords separated by '+' signs.
 *
 * Arguments
 * @request : The request JSON for the research to be made on Kijiji.
 * @language : The language that the research is made in.
 */
function keywordsBuilder(request, language){

  var keywords = request.languages[language].keywords;
  return keywords.join('+');
}

/**
 * Function to take the result of every ads from the query to the Kijiji Api
 * and normalizes them so that the results from every websites have the same format.
 *
 * Arguments
 * @data : A single ad from Kijiji
 */
function normalize(data) {
  var cleanedAd = {
    link : data.link,
    title : data.title,
    pubDate : data.pubDate,
    image : data.innerAd.image,
    description : data.innerAd.desc,
    price : parseFloat(data.innerAd.info.Prix.replace(' ', '').replace('$','').replace(',','.')) // The price has to be a float
  }

  return cleanedAd;
}

/**
 * Function that executes the query to the Kijiji's API.
 *
 * Arguments
 * @request : The request JSON for the research to be make on Kijiji.
 */
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
