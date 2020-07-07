const mongoose = require('mongoose')

const passwordSchema = new mongoose.Schema({
	cat_name:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"categories",
		required:true,
	},
	user_id:{
		type:String,
		required:true
	},
	project:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	date:{
		type:Date,
		default:Date.now()
	}
})

const passwordModel = mongoose.model('passwords',passwordSchema)
module.exports = passwordModel

