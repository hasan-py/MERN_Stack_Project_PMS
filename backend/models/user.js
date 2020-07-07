const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true,
		index:{
			unique:true,
		}
	},
	email:{
		type:String,
		required:true,
		index:{
			unique:true,
		},
		match:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
	},
	password:{
		type:String,
		required:true,
	},
	image:{
		type:String,
	},
	date:{
		type:Date,
		default:Date.now()
	}
})

const userModel = mongoose.model('users',userSchema)
module.exports = userModel


