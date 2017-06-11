var mongoose = require('mongoose'),
	bcrypt	 = require('bcryptjs'),
	config	 = require('../config/database');

	//user schema 

var userSchema = mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	username:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	}
});

var User = module.exports = mongoose.model('User',userSchema);
module.exports.getUserById = function(id, callback){
	User.findById(id,callback);
};
module.exports.getUserByUsername = function(username, callback){
	var query = {username:username};
	User.findOne(query,callback);
};
module.exports.getUserByEmail = function(email, callback){
	var query = {email:email};
	User.findOne(query,callback);
};
module.exports.addUser = function(newUser,callback){
	bcrypt.genSalt(10,(err,salt)=>{
		bcrypt.hash(newUser.password,salt,(err,hash)=>{
			if(err) throw err;
				newUser.password = hash;
				newUser.save(callback);
		});
	});
};
module.exports.validateUser = function(newUser,callback){
	User.findOne({username:newUser.username},callback);
}

module.exports.comparePassword = function(candidatePassword , hash ,callback){
	bcrypt.compare(candidatePassword,hash,callback);
}