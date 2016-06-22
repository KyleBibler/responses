var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  // Lobby = require('./lobby'),
  // User = require('./user');

mongoose.connect('mongodb://localhost/responsedb');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var onErr = function(err,callback) {  
  mongoose.connection.close();
  callback(err);
};