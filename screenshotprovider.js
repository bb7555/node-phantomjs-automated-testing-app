var Db = require("mongodb").Db
, Connection = require('mongodb').Connection
, Server = require('mongodb').Server
, BSON = require('mongodb').BSON
, ObjectID = require('mongodb').ObjectID;

ScreenshotProvider = function(host, port){
	this.db = new Db('node-mongo-screenshot', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
	this.db.open(function(){});
};

ScreenshotProvider.prototype.getCollection = function(callback){
	this.db.collection('screenshots', function(error, screenshot_collection){
	if(error) callback(error);
	else callback(null, screenshot_collection);
	});
};

//find all application ScreenShots Collections
ScreenshotProvider.prototype.findAll = function(callback) {
	this.getCollection(function(error, screenshot_collection) {
	if(error) callback(error)
	else{
	screenshot_collection.find().toArray(function(error, results) {
		if(error) callback(error)
		else callback(null, results)
	});
	}
});
};

//save new ScreenShot Collection
ScreenshotProvider.prototype.save = function(screenshots, callback) {
	this.getCollection(function(error, screenshot_collection) {
		if(error) callback(error)
		else {
			if(typeof(screenshots.length)=="undefined")
			screenshots = [screenshots];

			for(i=0;i<screenshots.length;i++) {
				screenshot = screenshots[i];
				screenshot.created_at = new Date();
			}

			screenshot_collection.insert(screenshots, function() {
				callback(null, screenshots);
			});		
		}
	});
};

//Find an individual screen shot collection By ID
ScreenshotProvider.prototype.findById = function(id, callback) {
	this.getCollection(function(error, screenshot_collection) {
		if(error) callback(error)
		else {
		screenshot_collection.findOne({_id: screenshot_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result){
		if(error) callback(error)
		else callback(null, result)
		});
	}
	});
};

//update a screen shot collection record
ScreenshotProvider.prototype.update = function(screenshotId, screenshots, callback) {
	this.getCollection(function(error, screenshot_collection) {
	if(error) callback(error)
	else {
		screenshot_collection.update(
					{_id: screenshot_collection.db.bson_serializer.ObjectID.createFromHexString(screenshotId)},
					screenshots,
					function(error, screenshots){
						if(error) callback(error);
						else callback(null, screenshots)
					});
	}
	});
};

//delete screenshot collection record
ScreenshotProvider.prototype.delete = function(screenshotId, callback) {
	this.getCollection(function(error, screenshot_collection) {
		if(error) callback(error);
		else {
			screenshot_collection.remove(
				{_id: screenshot_collection.db.bson_serializer.ObjectID(screenshotId)},
				function(error, screenshot){
					if(error) callback(error);
					else callback(null, screenshot)
				});
			}
	});
};

exports.ScreenshotProvider = ScreenshotProvider;
