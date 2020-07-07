const userModel = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



exports.checkEmailExistMiddleware = (req,res,next)=>{
	let email = req.body.email
	
	if(email.length == 0){
		return res.json({
			message:"Email must not be blank. "
		});
	}

	let checkEmail = userModel.findOne({email:email})
	checkEmail.exec((err,data)=>{
		if(err) throw err;
		if(data){
			return res.json({
				message:"Email already exits. "
			});
		}
	next();
	})
}


exports.checkNameExistMiddleware = (req,res,next)=>{
	let name = req.body.name
	if(name.length == 0){
		return res.json({
			message:"Name must be 5 char. "
		});
	}
	let checkName = userModel.findOne({name:name})
	checkName.exec((err,data)=>{
		if(err) throw err;
		if(data){
			return res.json({
				message:"Username already exits. "
			});
		}
	next();
	})
}
