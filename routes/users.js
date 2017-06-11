var express  = require("express"),
	 router  = express.Router(),
	 User    = require('../models/user'),
	passport = require("passport"),
	config	 = require("../config/database"),
	jwt		=  require("jsonwebtoken");
//Register
router.post("/register",(req , res, next)=>{
	let newUser = new User({
		name:req.body.name,
		email:req.body.email,
		username: req.body.username,
		password: req.body.password
	});
	User.getUserByUsername(newUser.username,(err,user)=>{
			
			if(err) console.log(err);
			
			else if(user) {
				res.json({success:false,message:'User Already Exists'});
			} else {
					User.getUserByEmail(newUser.email,(err,user)=>{
						if(err) console.log(err);
						if(user) {
							res.json({success:false,message:'Email Already Registered'});
						} else {
							User.addUser(newUser,(err, user)=>{
								if(err) console.log(err);
								if(err){
									res.json({success:false,message:'Failed to register user'});
								} else {
									res.json({success:true,message:"User registered"});
								}
							});
						}	
					});
			}
	});
	
});

//Autheticate
router.post("/authenticate",(req, res, next)=>{
	var username = req.body.username;
	var password = req.body.password;
	User.getUserByUsername(username,(err,user)=>{
		if(err) throw err;
		if(!user){
			 return res.json({success:false,message:"User not found"});
		}
		User.comparePassword(password,user.password,(err, isMatch)=>{
			if(err) throw err;
			if(isMatch){
				var token = jwt.sign(user ,config.secret,{
					expiresIn:604800
				});
				
				res.json({
					success:true,
					token:"JWT "+token,
					user:{
						id:user._id,
						name:user.name,
						email:user.email
					}
				});
			} else {
				return res.json({success:false , message:"Wrong Password"});
			}
		});
	});
});

//Profile
router.get("/profile",passport.authenticate('jwt',{session:false}),(req,res,next)=>{
	res.json({user:req.user});
});

module.exports = router ;