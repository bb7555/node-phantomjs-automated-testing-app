var xmlhttp
, data = '';
 xmlhttp=new XMLHttpRequest();

 xmlhttp.onreadystatechange=function(){
 	if (xmlhttp.readyState==4 && xmlhttp.status==200){
 		data=xmlhttp.responseText;
 		alert(data);
 		//parse the mongo db dump
data = "["+data+"]";
data = data.replace(/(\r\n|\n|\r)/gm,",");
data = data.replace(",]", "]");

//convert the string to JSON and then an object
var stringifyData = JSON.stringify(data);
//var firstParseData =  JSON.parse(stringifyData);
var dataObj = JSON.parse(stringifyData);

//export the mongo db data for use by phantom
exports.tests = dataObj;

exports.getFileName = function(test,local) {
return 'public/images/results/' + test.host.replace(/\./g,'-').replace(/\:[0-9]+/,'').replace('-com','').replace('www-','') + test.path.replace(/\//g,'-').replace(/\?clienttype=/g, "clienttype") + ((local) ? '-locl' : '-prod')
}
 	}
 }

xmlhttp.open("GET",'../data/configData.json',true);
xmlhttp.send();



