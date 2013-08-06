
//classes to allow node to connect to the terminal
var sys = require('sys')
, exec = require('child_process').exec
, child;

RunPhantom = function(){};

//connect to the terminal
RunPhantom.prototype.connectTerminal = function(cmd){
	
	child = exec("/home/cbarnes/phantomjs-1.9.1/bin/phantomjs run.js", function (error, stdout, stderr) {
	  sys.print('stdout: ' + stdout);
	  sys.print('stderr: ' + stderr);
	  if (error !== null) {
	    console.log('exec error: ' + error);
	  	}	
	});

	if(child){return true;}	
	
};

//testing nodeunit
RunPhantom.prototype.testCase = function(){
	return false;
};

exports.RunPhantom = RunPhantom;