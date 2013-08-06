var Db = require("mongodb").Db
, Connection = require('mongodb').Connection
, Server = require('mongodb').Server
, BSON = require('mongodb').BSON
, ObjectID = require('mongodb').ObjectID
, fs = require('fs')
, sys = require('sys')
, exec = require('child_process').exec
, child;

UrlProvider = function(host, port){
	this.db = new Db('node-mongo-url', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
	this.db.open(function(){});
};

UrlProvider.prototype.getCollection = function(callback){
	this.db.collection('urls', function(error, url_collection){
	if(error) callback(error);
	else callback(null, url_collection);
	});
};

//find all application URLs
UrlProvider.prototype.findAll = function(callback) {
	this.getCollection(function(error, url_collection) {
	if(error) callback(error)
	else{
	url_collection.find().toArray(function(error, results) {
		if(error) callback(error)
		else callback(null, results)
	});
	}
});
};

//save new URL
UrlProvider.prototype.save = function(urls, callback) {
	this.getCollection(function(error, url_collection) {
		if(error) callback(error)
		else {
			if(typeof(urls.length)=="undefined")
			urls = [urls];

			for(i=0;i<urls.length;i++) {
				url = urls[i];
				url.created_at = new Date();
			}

			url_collection.insert(urls, function() {
				callback(null, urls);
			});
		}
	});
};

//Find URL By ID
UrlProvider.prototype.findById = function(id, callback) {
	this.getCollection(function(error, url_collection) {
		if(error) callback(error)
		else {
		url_collection.findOne({_id: url_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result){
		if(error) callback(error)
		else callback(null, result)
		});
	}
	});
};

//update a URL record
UrlProvider.prototype.update = function(urlId, urls, callback) {
	this.getCollection(function(error, url_collection) {
	if(error) callback(error)
	else {
		url_collection.update(
					{_id: url_collection.db.bson_serializer.ObjectID.createFromHexString(urlId)},
					urls,
					function(error, urls){
						if(error) callback(error);
						else callback(null, urls)
					});
	}
	});
};

//delete URL record
UrlProvider.prototype.delete = function(urlId, callback) {
	this.getCollection(function(error, url_collection) {
		if(error) callback(error);
		else {
			url_collection.remove(
				{_id: url_collection.db.bson_serializer.ObjectID(urlId)},
				function(error, url){
					if(error) callback(error);
					else callback(null, url)
				});
			}
	});
};

//write a new json file to the app for PHANTOMJS to use
UrlProvider.prototype.updateJSON = function(path, callback) {
	child = exec("mongoexport --db node-mongo-url --collection urls --out public/data/configData.json", function (error, stdout, stderr) {
	  sys.print('stdout: ' + stdout);
	  sys.print('stderr: ' + stderr);
	  if (error !== null) {
	    console.log('exec error: ' + error);
	  	}	
	});
};

exports.UrlProvider = UrlProvider;
