//add the data model

var SSHOT = require('../models/screenshot.js');
var imageController = require('./image.js');

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

exports.save = function(req, res, current_id){
	 new SSHOT({'user_id': req.query.user_id}).save(function(){
	 	SSHOT.findOne({}, {}, { sort: { 'postdate' : -1 } }, function(err, sshot){


				fs = require('fs');
				var dataObj;
				var currentImage;
				fs.readFile('public/data/configData.json', 'utf8', function (err,data) {
					if (err) {
					    return console.log(err);
					  }
					  
					    //parse the mongo db dump
						data = "["+data+"]";
						data = data.replace(/(\r\n|\n|\r)/gm,",");
						data = data.replace(",]", "]");

						//convert the string to JSON and then an object
						var stringifyData = JSON.stringify(data);
						var firstParseData =  JSON.parse(stringifyData);
						dataObj = JSON.parse(firstParseData);	

						getFileName = function(test,local) {
						return 'images/results/' + test.host.replace(/\./g,'-').replace(/\:[0-9]+/,'').replace('-com','').replace('www-','') + test.path.replace(/\//g,'-').replace(/\?clienttype=/g, "clienttype") + ((local) ? '-locl' : '-prod')
						}
				
						var test = {}
						, i = 0;
						makeCall = function(i,local) {
							if ( i < dataObj.length ) {
							test = dataObj[i];

							currentImage = getFileName(test,local) + '.png';
							imageController.save(sshot._id, currentImage);

								if(local) {
								makeCall(i+1);
								} else {
								makeCall(i,true);
								}
							}
						};
						makeCall(0);
				});

	 		
	 	});

	 });
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