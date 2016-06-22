var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10;


var lobbySchema = new Schema({
	name: {type:String, unique:true, required: true},
	isPublic: {type: Boolean, default: false},
	shareAnswers: {type: Boolean, default: true},
	host: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	users: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	password: {
		type: String, 
		default: undefined, 
		required: function(val) {
			return !this.isPublic && val === undefined;
		}
	},
	forceAnonymous: {type: Boolean, default: false},
	allowAnonymous: {type: Boolean, default: false},
	currentQuestion: {type: String},
	currentResponses: [{type: String}],
	createdOn: {type: Date, default: Date.now()}
});

lobbySchema.pre('save', function(next) {
	var lobby = this;


    // only hash the password if it has been modified (or is new)
    if (lobby.isPublic || lobby.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(lobby.password, salt, null, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            lobby.password = hash;
            next();
        });
    });
});

lobbySchema.methods.comparePassword = function(candidate, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

var Lobby = mongoose.model('Lobby', lobbySchema);

module.exports = Lobby;
