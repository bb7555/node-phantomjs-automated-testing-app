//add the data model

var SSHOT = require('../models/screenshot.js');

exports.list = function(req, res){
	SSHOT
	.find()
	.populate('user_id', 'name')
	.exec(function(err, sshots){
		if (err) console.log(err);
		res.render('ss_index', {
			title: 'Screen Shots run by Automated Testing App',
			sshots: sshots
		});
	});
}

exports.save = function(req, res){
	 new SSHOT({'user_id': req.query.user_id}).save();
}

exports.single = function(req, res){

		SSHOT.findOne({'_id': req.query._id}, function(error, sshot){
			res.render('sshot_update', {
				title: 'Update single Screen Shots entry',
				sshot: sshot
			});
		});
}

exports.update = function(req, res){
	SSHOT.update({_id: req.body._id}, {path: req.body.path, host: req.body.host}, function(){
		
		
	});
}

exports.delete = function(req, res){
	SSHOT.remove(function(err){
		SSHOT.findById(req.body._id, function(){
			
			
		});
	});
}