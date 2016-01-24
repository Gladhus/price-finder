var request = require('request');

var url = "http://svcs.ebay.com/services/search/FindingService/v1"
  + "?OPERATION-NAME=findItemsByKeywords"
  + "&SERVICE-VERSION=1.0.0"
  + "&SECURITY-APPNAME=FrancisB-5995-4ffa-a7c3-0b2589483ad7"
  + "&GLOBAL-ID=EBAY-US"
  + "&RESPONSE-DATA-FORMAT=JSON"
  + "&callback=_cb_findItemsByKeywords"
  + "&REST-PAYLOAD"
  + "&keywords=harry%20potter"
  + "&paginationInput.entriesPerPage=3";

request.get(url, function(error, response, body) {
  console.log(error);
  console.log(response);
  console.log(body);
});
