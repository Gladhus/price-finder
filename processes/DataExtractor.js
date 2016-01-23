var request = require('request');
var kijiji = require('kijiji-scraper');

console.log('[DataExtractor] PID #' + process.pid + ' spawned');

var callback;
var parent;

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

process.on('message', function(data) {

  //getKijijiResults(request, 'french');

  callback = new Function('return ' + data.callback)();
  parent = data.parent;

});

function keywordsBuilder(request, language){
  var keywords = request.languages[language].keywords[0];
  for(var i = 1; i < request.languages[language].keywords.length; ++i){
    keywords += '+';
    keywords += request.languages[language].keywords[i];
  }
  return keywords;
}

function getKijijiResults(request){
  kijiji.query({'locationId':request.region}, {'keywords':keywordsBuilder(request, 'french')}, function(err, ads) {
    console.log(ads); 
  });
}

getKijijiResults(request);
