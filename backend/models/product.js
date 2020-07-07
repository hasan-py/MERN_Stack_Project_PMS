const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true,
	},
	price:{
		type:Number,
		required:true
	},
	quantity:{
		type:Number,
		required:true
	},
	image:{
		type:String,
		required:true
	},
	date:{
		type:Date,
		default:Date.now()
	}
})

const productModel = mongoose.model('products',productSchema)
module.exports = productModel

