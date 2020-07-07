const userModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



exports.checkEmailExistMiddleware = (req,res,next)=>{
	let email = req.body.email
	let checkEmail = userModel.findOne({email:email})
	checkEmail.exec((err,data)=>{
		if(err) throw err;
		if(data){
			return res.render('signup', { title: 'PMS Signup', msg:"Email Already Exists" });
		}
	next();
	})
}


exports.checkNameExistMiddleware = (req,res,next)=>{
	let name = req.body.name
	let checkName = userModel.findOne({name:name})
	checkName.exec((err,data)=>{
		if(err) throw err;
		if(data){
			return res.render('signup', { title: 'PMS Signup', msg:"Username Already Exists. Please Give another" });
		}
	next();
	})
}


exports.checkLoginMiddleware = (req,res,next)=>{
	// let userToken = localStorage.getItem('userToken')
	let userToken = req.session.userToken
	try {
		jwt.verify(userToken,'loginToken')
	}catch(err){
		res.redirect('/')
	}
	next()
}


exports.checkLogoutMiddleware = (req,res,next)=>{
	// var myToken = localStorage.getItem('userToken')
	let myToken = req.session.userToken
	if(myToken){
		res.redirect('/dashboard')
	}else{
		next()
	}
}

