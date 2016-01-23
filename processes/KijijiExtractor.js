var Q = require('q');
var _ = require('lodash');

function normalize(data) {

  return data + ' normalized';
}

function extract() {
  var deferred = Q.defer();

  var fetchedData = ['lol', 'lol2', 'lol3'];
  var cleanedData = [];

  _.each(fetchedData, function(item, index, array) {

    cleanedData[index] = normalize(item);

    if(index == array.length - 1) deferred.resolve(cleanedData);
  });

  return deferred.promise;
}

module.exports = {
  extract: extract
}

extract()
  .then(function(data) {console.log(data)});
