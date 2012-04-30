// Created by mayank saxena first.
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
 
  // Register ejs as .html
  app.register('.html', require('ejs'));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

//app.get('/', routes.index);
//app.post('/home', routes.login);

/*
	APPLICATION ROUTES
*/

// Controllers
var BaseControllerModule = require("./routes/BaseController");
// Base controller set
var BaseController = new BaseControllerModule(app);


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

process.on("uncaughtException", function(err) {
	console.log(err);
	process.exit(0);
});
