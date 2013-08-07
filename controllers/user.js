//add the data model and other depend3encies
var User = require('../models/user.js');

exports.list = function(req, res){
	User.find(function(err, users){
		res.render('user_index', {
			title: 'Users who may run Automated Testing App',
			users: users
		});
	});
}

exports.create = function(req, res){
	res.render('user_create', {
		title: 'Create a new User'
	})
}

exports.save = function(req, res){
	 new User({title: req.body.title, name: req.body.name}).save(function(error, docs){
		res.redirect('/user/index');
	});
}

exports.single = function(req, res){

		User.findOne({'_id': req.query._id}, function(error, user){
			res.render('user_update', {
				user: user
			});
		});
}

exports.update = function(req, res){
	User.update({_id: req.body._id}, {title: req.body.title, name: req.body.name}, function(){
		res.redirect('/user/index');
	});
}

exports.delete = function(req, res){
	User.remove(function(err){
		User.findById(req.body._id, function(){
			res.redirect('/user/index');
		});
	});
}
