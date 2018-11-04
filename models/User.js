// User.js
const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

const UserSchema = new Schema({ 
	firstname: { 
		type: String, 
		required: true 
	},
	lastname: { 
		type: String, 
		required: true 
	}, 	
  	email: { 
		type: String, 
		unique: true, 
		required: true 
	},
  	password: { 
		type: String, 
		required: true, 
		minlength: 8
	}
});

const User = mongoose.model('User', UserSchema);
module.exports = User;