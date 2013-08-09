//add the data model

var IMAGE = require('../models/image.js');

exports.list = function(req, res){
	IMAGE
	.find()
	.where('ss_id').equals(req.query._id)
	.exec(function(err, images){
		if (err) console.log(err);
		res.render('image_index', {
			title: 'Screen Shots run by Automated Testing App',
			images: images
		});
	});
}

exports.save = function(ss_id, filename){
	 new IMAGE({'ss_id': ss_id, 'filename': filename}).save();
}

exports.single = function(req, res){

		IMAGE.findOne({'_id': req.query._id}, function(error, image){
			res.render('image_update', {
				title: 'Update single Screen Shots entry',
				image: image
			});
		});
}

exports.update = function(req, res){
	IMAGE.update({_id: req.body._id}, {path: req.body.path, host: req.body.host}, function(){
		
		
	});
}

exports.delete = function(req, res){
	IMAGE.remove(function(err){
		IMAGE.findById(req.body._id, function(){
			
			
		});
	});
}