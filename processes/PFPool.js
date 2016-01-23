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

function getChildProcess(name, data, callback) {

  if(processes[name].pool.length < processes[name].limit) {

    var forkedProcess = fork(__dirname + '/' + name + '.js');
    processes[name].pool.push(forkedProcess);

    forkedProcess.send({
      callback: callback.toString(),
      parent: process.pid
    });

    return forkedProcess;
  }

  return false;

}

module.exports = {
  getChildProcess: getChildProcess
}
