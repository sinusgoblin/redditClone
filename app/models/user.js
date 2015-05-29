var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

	name: String,
	email: { type: String, unique: true, lowercase: true },
  	password: String,

 
  	twitter: String,
  	tokens: Array,

  	profile: {
    	name: { type: String, default: '' },
    	gender: { type: String, default: '' },
    	location: { type: String, default: '' },
    	website: { type: String, default: '' },
    	picture: { type: String, default: '' },
  	},



});
