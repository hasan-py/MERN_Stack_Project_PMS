const productModel = require('../../models/product')
let allProduct = productModel.find({}).sort({cat_name:"1"})

exports.getAllProduct = (req,res,next)=>{
	allProduct
	.select("name price quantity image")
	.exec()
	.then(data=>{
		res.json({
			messege:"Success",
			result:data
		})
	})
	.catch(err=>{
		res.json(err)
	})		
}

exports.addProduct = (req,res,next)=>{
	let {name,price,quantity} = req.body
	let image = req.file.filename

	let newProduct = new productModel({
		name,
		price,
		quantity,
		image,
	})

	newProduct.save()
	.then(data=>{
		res.json({
			message:image.name+" upload Successfully.",
			result:data
		})
	})
	.catch(err=>{
		res.json(err)
	})
}

exports.editProduct = (req,res,next)=>{
	let {id,name,price,quantity} = req.body
	let image = req.file.filename

	let edit = productModel.findByIdAndUpdate(id,{
		name,
		price,
		quantity,
		image
	})

	edit.exec()
	.then(data=>{
		res.json({
			message:"Product Edit Successfully. ",
			result:{
				name,
				price,
				quantity,
				image
			}
		})
	})
	.catch(err=>{
		res.json(err)
	})
}


exports.deleteProduct = (req,res,next)=>{
	let id = req.params.id
	let del = productModel.findByIdAndDelete(id)

	del.exec()
	.then(data=>{
		res.json({
			messege:"Delete Successfully",
			result:data
		})
	})
	.catch(err=>{
		res.json(err)
	})
}