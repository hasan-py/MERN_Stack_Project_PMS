const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
	cat_name:{
		type:String,
		required:true
	},
	user_id:{
		type:String,
		required:true
	},
	date:{
		type:Date,
		default:Date.now()
	}
})

const categoryModel = mongoose.model('categories',categorySchema)
module.exports = categoryModel

