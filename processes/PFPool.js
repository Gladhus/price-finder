var fork = require('child_process').fork;

var processes = {
  dataExtractor: {
    limit: 10,
    pool: []
  },
  dataNormalizer: {
    limit: 10,
    pool: []
  },
  dataCompiler: {
    limit: 10,
    pool: []
  }
};

function getDataExtractor(callback) {

  if(processes.dataExtractor.pool.length < processes.dataExtractor.limit) {

    var forkedProcess = fork(__dirname + '/DataExtractor.js');
    processes.dataExtractor.pool.push(forkedProcess);

    forkedProcess.send({
      callback: callback.toString(),
      parent: process.pid
    });

    return forkedProcess;
  }

  return false;

}

function getDataNormalizer(callback) {

  if(processes.dataNormalizer.pool.length < processes.dataNormalizer.limit) {
    var forkedProcess = fork(__dirname + '/DataNormalizer.js');
    processes.dataNormalizer.pool.push(forkedProcess);
    return forkedProcess;
  }

  return false;

}

function getDataCompiler(callback) {

  if(processes.dataCompiler.pool.length < processes.dataCompiler.limit) {
    var forkedProcess = fork(__dirname + '/DataCompiler.js');
    processes.dataCompiler.pool.push(forkedProcess);
    return forkedProcess;
  }

  return false;

}

getDataExtractor(function() {console.log('mange mes bas')});
