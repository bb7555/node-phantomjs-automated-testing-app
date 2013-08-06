var fs = require('fs')
, data = fs.read('public/data/configData.json');

//parse the mongo db dump
data = "["+data+"]";
data = data.replace(/(\r\n|\n|\r)/gm,",");
data = data.replace(",]", "]");

//convert the string to JSON and then an object
var stringifyData = JSON.stringify(data);
var firstParseData =  JSON.parse(stringifyData);
var dataObj = JSON.parse(firstParseData);

//export the mongo db data for use by phantom
exports.tests = dataObj;

exports.getFileName = function(test,local) {
return 'public/images/results/' + test.host.replace(/\./g,'-').replace(/\:[0-9]+/,'').replace('-com','').replace('www-','') + test.path.replace(/\//g,'-').replace(/\?clienttype=/g, "clienttype") + ((local) ? '-locl' : '-prod')
}