var express = require('express'),
	Lobby = require('../models/lobby'),
	router = express.Router({mergeParams: true});

/* GET lobby listing. */
var getLobbyWithPermissionCheck = function(lobbyNum, callback) {
	//DB query to get lobby info
	//Fake for now
	var lobbyData = {
		name: "Cool Lobby",
		id: 1,
		users: [{name: "Kyle"}, {name: "Cody"}, {name: "John"}],
		isPublic: false,
		shareAnswers: false,
		isAnonymous: false,
		allowAnonymous: false,
		currentQuestion: "This is something",
		currentResponses: [{text: "Something something", user: "Kyle"}]
	};
	return callback(lobbyData);
};

var submitResponse = function(response, callback) {
	var errors = [];
	return callback(errors);
};

var checkAccess = function(lobbyId, pw, callback) {

};

router.route('/').get(function(req, res) {
	var lobbyNum = req.params.lobby;
	getLobbyWithPermissionCheck(lobbyNum, function(lobbyData) {
		res.render('lobby', { lobbyData: lobbyData });
	});	
});

module.exports = router;