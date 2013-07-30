////////////////////////Module dependencies
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , EmployeeProvider = require('./employeeprovider').EmployeeProvider
  , RunPhantom = require('./runPhantom').RunPhantom
  , UrlProvider = require('./urlprovider').UrlProvider;

/////////////Instantiate the framework object
var app = express();

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

///////////////////////Instantiate App Data/Model Objects
var employeeProvider = new EmployeeProvider('localhost', 27017);
var urlProvider = new UrlProvider('localhost', 27017);
var runPhantom = new RunPhantom();

/////////////////////////////ROUTES FOR APP


////////////URL CRUD
//index page, display all URLs to be tested
app.get('/', function(req, res){
	urlProvider.findAll(function(error, emps){
		res.render('index', {
			title: 'URLs to be tested by Automated Testing App',
			urls: emps
		});
	});
});

//Save new URL entry
app.post('/url/new', function(req, res){
	urlProvider.save({
		host: req.param('host'),
		path: req.param('path')
	}, function(error, docs){
		res.redirect('/')
	});
});

//display create new URL for
app.get('/url/new', function(req, res){
	res.render('url_new', {
		title: 'Create New URL to be Tested'
	});
});

//show individual url in DB
app.get('/url/:id/edit', function(req, res){
	urlProvider.findById(req.param('_id'), function(error, url){
		res.render('url_edit',
			{
				url: url
			});
	});
});

//save URL update
app.post('/url/:id/edit', function(req, res){
	urlProvider.update(req.param('_id'),{
		host: req.param('host'),
		path: req.param('path')
	}, function(error, doc){
		res.redirect('/')
	});
});

//delete URL record
app.post('/url/:id/delete', function(req, res){
	urlProvider.delete(req.param('_id'), function(error, docs){
		res.redirect('/')
	});
});

////////////////APP USERS CRUD
//Display all app users
app.get('/employee/list', function(req, res){
	employeeProvider.findAll(function(error, emps){
		res.render('employee_index', {
			title: 'Users of The Automated Testing App',
			employees: emps
		});
	});
});

//Save new user entry
app.post('/employee/new', function(req, res) {
	employeeProvider.save({
		title: req.param('title'),
		name: req.param('name')
	}, function(error, docs) {
		res.redirect('/employee/list')
	});
});

//display create new user form and view
app.get('/employee/new', function(req, res) {
	res.render('employee_new', {
		title: 'Create New App User'
	});
});

//show individual user
app.get('/employee/:id/edit', function(req, res) {
	employeeProvider.findById(req.param('_id'), function(error, employee) {
		res.render('employee_edit',
		{
			employee: employee
		});
	});
});

//save updates to user
app.post('/employee/:id/edit', function(req, res) {
	employeeProvider.update(req.param('_id'),{
		title: req.param('title'),
		name: req.param('name')
	}, function(error, docs) {
		res.redirect('/employee/list')
	});
});

//delete an app user
app.post('/employee/:id/delete', function(req, res) {
	employeeProvider.delete(req.param('_id'), function(error, docs) {
		res.redirect('/employee/list')
	});
});

//////////////////PHANTOMJS CONTROLLER
//Run Automated Testing App
app.get('/automated/testing', function(req, res){
	runPhantom.connectTerminal();
	res.render('automated_testing', {
		title: 'Started Automated Testing'
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
