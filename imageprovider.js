var Db = require("mongodb").Db
, Connection = require('mongodb').Connection
, Server = require('mongodb').Server
, BSON = require('mongodb').BSON
, ObjectID = require('mongodb').ObjectID;

ImageProvider = function(host, port){
	this.db = new Db('node-mongo-image', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
	this.db.open(function(){});
};

ImageProvider.prototype.getCollection = function(callback){
	this.db.collection('images', function(error, image_collection){
	if(error) callback(error);
	else callback(null, image_collection);
	});
};

//find all application ScreenShots Collections
ImageProvider.prototype.findAll = function(callback) {
	this.getCollection(function(error, image_collection) {
	if(error) callback(error)
	else{
	image_collection.find().toArray(function(error, results) {
		if(error) callback(error)
		else callback(null, results)
	});
	}
});
};

//save new ScreenShot Collection
ImageProvider.prototype.save = function(images, callback) {
	this.getCollection(function(error, image_collection) {
		if(error) callback(error)
		else {
			if(typeof(images.length)=="undefined")
			images = [images];

			for(i=0;i<images.length;i++) {
				image = images[i];
				image.created_at = new Date();
			}

			image_collection.insert(images, function() {
				callback(null, images);
			});
		}
	});
};

//Find an individual screen shot collection By ID
ImageProvider.prototype.findById = function(id, callback) {
	this.getCollection(function(error, image_collection) {
		if(error) callback(error)
		else {
		image_collection.findOne({_id: image_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result){
		if(error) callback(error)
		else callback(null, result)
		});
	}
	});
};

//update a screen shot collection record
ImageProvider.prototype.update = function(imageId, images, callback) {
	this.getCollection(function(error, image_collection) {
	if(error) callback(error)
	else {
		image_collection.update(
					{_id: image_collection.db.bson_serializer.ObjectID.createFromHexString(imageId)},
					images,
					function(error, images){
						if(error) callback(error);
						else callback(null, images)
					});
	}
	});
};

//delete image collection record
ImageProvider.prototype.delete = function(imageId, callback) {
	this.getCollection(function(error, image_collection) {
		if(error) callback(error);
		else {
			image_collection.remove(
				{_id: image_collection.db.bson_serializer.ObjectID(imageId)},
				function(error, image){
					if(error) callback(error);
					else callback(null, image)
				});
			}
	});
};

exports.ImageProvider = ImageProvider;
