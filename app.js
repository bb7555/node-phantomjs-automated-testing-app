////////////////////////Module dependencies
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , RunPhantom = require('./runPhantom').RunPhantom;

/////////////Instantiate the framework object
var app = express();

//connect to MongoDB after app initializes
mongoose.connect('mongodb://localhost/automated_testing');

///////////////////////// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// ensure we see error codes in case of errors
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//instantiate controllers with their models
var urlController = require('./controllers/url.js');
var userController = require('./controllers/user.js');
var runPhantom = new RunPhantom();
var screenshotController = require('./controllers/screenshot.js');
var imageController = require('./controllers/image.js');

/////////////////////////////ROUTES FOR APP

/////////////URL Routes
app.get('/url/index', urlController.list);
app.get('/url/create', urlController.create);
app.post('/url/create', urlController.save);
app.get('/url/update', urlController.single);
app.post('/url/update', urlController.update);
app.post('/url/delete', urlController.delete);

/////////////User Routes
app.get('/user/index', userController.list);
app.get('/user/create', userController.create);
app.post('/user/create', userController.save);
app.get('/user/update', userController.single);
app.post('/user/update', userController.update);
app.post('/user/delete', userController.delete);

/////////////ScreenShot Routes
app.get('/screenshots/index', screenshotController.list);


////////////Screen Shot Images Routes
app.get('/screenshots/view', imageController.list);

////////////Run Automated Testing App
app.get('/automated/testing', function(req, res){
	
	
	//save the screen shot record and add all the images to images db
	screenshotController.save(req, res);
	
	runPhantom.connectTerminal();
	res.render('automated_testing', {
		title: 'Started Automated Testing'
	});
});

/////////////////View screen shots
app.get('/automated/index', function(req, res){
	res.render('automated_index');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
