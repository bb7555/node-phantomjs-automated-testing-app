var fs = require('fs')
, config = require('./config')
, tests = config.tests
, test = {}
, WebPage = require('webpage')
, page = f = null
, localdomain = 'interfacedev'
, getFileName = config.getFileName
, endProc = function(){ phantom.exit(); }
, makeCall = function(i,local) {
if ( i < tests.length ) {
	test = tests[i];
	page = WebPage.create();


	//uncomment and edit the below line to change screen size for mobile.
	//page.viewportSize = { width: 320 };

	var pageCall = function() {page.open('http://' + (local ? localdomain : test.host) + test.path,function(status) {

	page.render(getFileName(test,local) + '.png');

	page.close();
	if(local) {
	makeCall(i+1);
	} else {
	makeCall(i,true);
	}

	});
	}

	try {
	pageCall();
	} catch (e) {
	//in case the page call or page render throws an exception, get us outta here. Don't hang up.
	endProc();
	}	

} else {
// Last request should be complete as makeCall is only triggered by call completion
endProc();
}
}
makeCall(0);
