var nodeunit = require('./node_modules/nodeunit/lib/nodeunit.js')
, http = require('http')
, EmployeeProvider = require('./employeeprovider').EmployeeProvider
, RunPhantom = require('./runPhantom').RunPhantom
, ScreenshotProvider = require('./screenshotprovider').ScreenshotProvider
, ImageProvider = require('./imageprovider').ImageProvider
, UrlProvider = require('./urlprovider').UrlProvider;

var employeeProvider = new EmployeeProvider('localhost', 27017);
var runPhantom = new RunPhantom();
var urlProvider = new UrlProvider('localhost', 27017);
var screenshotProvider = new ScreenshotProvider('localhost', 27017);
var imageProvider = new ImageProvider('localhost', 27017);

var testCase = employeeProvider.testCase()
, testCasePhantom = runPhantom.testCase()
, testTerminalConnect = runPhantom.connectTerminal();

exports.testEmployeeProvider = function(test){

	test.expect(1); 
    test.equal(testCase, false, "this assertion should pass");
    test.done();
};

exports.testRunPhantom = function(test){
	test.expect(1);
	test.equal(testCasePhantom, false, "this assertion should pass");
	test.done();
};

exports.testConnectTerminal = function(test){
	test.expect(1);
	test.equal(testTerminalConnect, true, "Was unable to connect to the terminal");
	test.done();
};
