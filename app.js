var express = require('express'),
	path = require('path'),
	mongoose = require('mongoose'),
	http = require('http'),
	fs = require('fs'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	app = express();

//DATABASE
var db = require('./models/db');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Set up parsing http things
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Set up controllers
app.use('/', require('./controllers/main'));
app.use('/lobbies', require('./controllers/lobby-meta'));

//STATIC FILES
app.use('/static', express.static(path.join(__dirname, 'static')));


app.listen(3000, function() {
	console.log('App listening on port 3000!');
});