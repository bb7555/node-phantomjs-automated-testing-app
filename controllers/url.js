//add the data model

var URL = require('../models/url.js')
, fs = require('fs')
, sys = require('sys')
, exec = require('child_process').exec
, child;



exports.list = function(req, res){
	URL.find(function(err, urls){
		res.render('url_index', {
			title: 'URLs to be tested by Automated Testing App',
			urls: urls
		});
	});
}

exports.create = function(req, res){
	res.render('url_create', {
		title: 'Create a new URL for screenshots'
	})
}

exports.save = function(req, res){
	 new URL({path: req.body.path, host: req.body.host}).save(function(error, docs){
	 	updateJSON();
		res.redirect('/url/index');
	});
}

exports.single = function(req, res){

		URL.findOne({'_id': req.query._id}, function(error, url){
			res.render('url_update', {
				title: 'Update single URL entry',
				url: url
			});
		});
}

exports.update = function(req, res){
	URL.update({_id: req.body._id}, {path: req.body.path, host: req.body.host}, function(){
		updateJSON();
		res.redirect('/url/index');
	});
}

exports.delete = function(req, res){
	URL.remove({_id: req.body._id},function(err){
		
			updateJSON();
			res.redirect('/url/index');
		
	});
}

//write a new json file to the app for PHANTOMJS to use
updateJSON = function(path, callback) {
	child = exec("mongoexport --db automated_testing --collection urls --out public/data/configData.json", function (error, stdout, stderr) {
	  sys.print('stdout: ' + stdout);
	  sys.print('stderr: ' + stderr);
	  if (error !== null) {
	    console.log('exec error: ' + error);
	  	}	
	});
};