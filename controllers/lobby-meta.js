var express = require('express'),
	Lobby = require('../models/lobby'),
	listRouter = express.Router(),
	lobbyRouter = require('./lobby');

var getLobbyList = function(filters, callback) {
	//DB query to get list of lobbies
	//Fake for now
	var lobbies = [
		{name: "Cool Lobby", id: 1, isPrivate: true, usersPresent: 3, createdOn: "12/21/15 23:54"},
		{name: "Cool Lobby 2", id: 2, isPrivate: true, usersPresent: 3, createdOn: "12/21/15 23:57"},
	];
	return callback(lobbies);
};

var createLobby = function(lobbyData, callback) {
	//Do some db magic
	var errors = [];

	if(!lobbyData) {
		errors.push("The request body data isn't there...");		
		return callback(errors, lobbyData);
	}
	var newLobby = Lobby(lobbyData);
	newLobby.save(function(err) {
		if(err) {
			errors.push(err);
			console.log("THERE WAS AN ERROR");
		} else {
			console.log("NEW LOBBY CREATED");
		}
		return callback(errors, lobbyData);
	});
};

var getCurrentUser = function(callback) {

};

listRouter.get('/create-lobby', function(req, res, next) {
	res.render('create-lobby', {});
});

listRouter.post('/create-lobby', function(req, res, next) {
	//Get lobby data
	var lobbyData = req.body;
	lobbyData.isPublic = lobbyData.isPublic === "true";	
	console.log(lobbyData);
	
	createLobby(lobbyData, function(errors, lobbyId) {
		if(errors.length === 0) {
			//Redirect to lobby
			res.redirect('/lobbies/'+lobbyId);
		} else {
			//Show errors
			res.render('create-lobby', {errors: errors});
		}
	});
	next();
});

listRouter.post('/access', function(req, res, next) {
	//Get password and hash it, lobbyNum from post data
	var lobbyNum = req.body.lobbyId,
		pw = req.body.pw;
	checkAccess(lobbyNum, pw, function(errors) {

	});
	next();
});

listRouter.get('/', function(req, res, next) {	
	//Get list of lobbies
	getLobbyList([], function(lobbies) {
		res.render('lobby-list', {lobbies: lobbies});
	});
	next();
});

listRouter.use('/:lobby', lobbyRouter);

module.exports = listRouter;