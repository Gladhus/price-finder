console.log("[DataExtractor] PID #" + process.pid + " spawned");

var callback;
var parent;

process.on('message', function(data) {

  callback = new Function('return ' + data.callback)();
  parent = data.parent;

});
