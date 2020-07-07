const express = require('express');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const chechAuth = require('./middleware/auth')
const {checkEmailExistMiddleware,checkNameExistMiddleware} = require('./middleware/signupMiddleware')

const userModel = require('../models/user')
let allUser = userModel.find({}).sort({cat_name:"1"})

// Image Upload setting
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/profile')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+ "_" +file.originalname)
  }
})

const upload = multer({storage:storage});


router.get('/',(req,res,next)=>{
	res.json({
		message:"Success"
	})
})

router.get('/all-user',chechAuth,(req,res,next)=>{
	// Using fetch
	allUser
	.select("name email password")
	.exec()
	.then(data=>{
		res.json({
			message:"Success",
			result:data
		})
	})
	.catch(err=>{
		res.json(err)
	})

	// Using Async await	
	/*try{
		let result = await  allUser.select("name email password").exec()
		res.json(result)
	}catch(err){
		res.json(err)
	}*/
		
})

router.get('/fetchUserDetails/:user_id',chechAuth,(req,res,next)=>{
	// Using fetch
	let user_id = req.params.user_id
	let userDetails = userModel.find({_id:user_id})
	userDetails
	.select("name email image date")
	.exec()
	.then(data=>{
		res.json({
			message:"Success",
			result:data
		})
	})
	.catch(err=>{
		res.json(err)
	})
})

router.post('/register',checkNameExistMiddleware,checkEmailExistMiddleware,(req,res,next)=>{
	let name = req.body.name
	let email = req.body.email
	let password = req.body.password
	let confirmPassword = req.body.confirmPassword
	
	if( password.length < 8 && confirmPassword.length < 8 ){
		res.json({
			message:"Password must be 8 charecter."
		})
	}
	else if( password !== confirmPassword ){
		res.json({
			message:"Password doesn't matched."
		})
	}
	else{
		password = bcrypt.hashSync(password,15)
		let newUser = new userModel({
			name:name,
			email:email,
			password:password,
			image:""
		})

		newUser.save()
		.then(data=>{
			res.json({
				message:"User Resgister Successfully",
				result:data
			})
		})
		.catch(err=>{
			res.json(err)
		})
	}
})

router.post('/login',(req,res,next)=>{
	let email = req.body.email
	let password = req.body.password

	let foundUser = userModel.find({email:email})
	foundUser.exec()
	.then(data=>{
		if(data.length>0){
			if(bcrypt.compareSync(password,data[0].password)){
				const token = jwt.sign(
					{
						email:data[0].email,
						username:data[0].username,
						id:data[0]._id
					},
					'secret',
					{ expiresIn: '7d' }
				)
				res.json({
					message:"Login Successfully",
					token:token
				})
			}else{
				res.json({
					message:"email or password incorrect"
				})
			}
		}else{
			res.json({
				message:"email or password incorrect"
			})
		}
	})
	.catch(err=>{
		res.json(err)
	})

})

router.post('/delete-user',(req,res,next)=>{
	let id = req.body.id
	let del = userModel.findOneAndDelete(id)

	del.exec()
	.then(data=>{
		res.json({
			message:"Delete Successfully",
			result:data
		})
	})
	.catch(err=>{
		res.json(err)
	})
})

router.post('/edit-profile',upload.single('pic'),chechAuth,(req,res,next)=>{
	let {id} = req.body
	let image = req.file.filename
	console.log(image)
	let edit = userModel.findOneAndUpdate(id,{
		image
	})

	edit.exec()
	.then(data=>{
		res.json({
			message:"Update Successfully",
			image
		})
	})
	.catch(err=>{
		res.json(err)
	})
})



module.exports = router