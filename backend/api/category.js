const express = require('express');
const router = express.Router();

const userModel = require('../models/user')
const categoryModel = require('../models/category')
const passwordModel = require('../models/password')
const chechAuth = require('./middleware/auth')

let allCategory = categoryModel.find({}).sort({cat_name:"1"})
// let allPassword = passwordModel.find({},{'cat_name':1,'_id':0}).sort({cat_name:"1"})



router.get('/:user_id',chechAuth,(req,res,next)=>{
	/*allCategory.exec((err,data)=>{
		if (err) throw err;
		res.status(200).json({
			msg:"success",
			result:data
		});
	})*/
	let user_id = req.params.user_id
	let allCategoryByUserID = categoryModel.find({user_id:user_id}).sort({cat_name:"1"})
	allCategoryByUserID.exec()
	.then(data=>{
		res.status(200).json({
			msg:"success",
			result:data
		})
	})
	.catch(err=>{
		res.json(err)
	})
})


router.post('/add-category',chechAuth,(req,res,next)=>{
	let {cat_name,user_id} = req.body
	let create = new categoryModel({
		cat_name,
		user_id
	})
	/*create.save((err,doc)=>{
		if(err) throw err;	
		res.status(201).json({
			msg:"Data Insert succcessfully",
			result:doc
		});
	})*/
	create.save()
	.then((data)=>{
		res.status(201).json({
			msg:"success",
			result:data
		})
	})
	.catch(err=>{
		res.json(err)
	})
})



router.put('/add-put-category',chechAuth,(req,res,next)=>{
	let cat_name = req.body.cat_name
	let id = req.body.id
	let edit = categoryModel.findByIdAndUpdate(id,{
		cat_name:cat_name
	})
	/*edit.exec((err,data)=>{
		if(err) throw err;
		res.status(201).json({
			msg:"Data Update succcessfully",
			result:data
		});
	})*/
	
	edit.exec()
	.then((data)=>{
		res.status(201).json({
			msg:"Data Update succcessfully",
			result:data
		});
	})
	.catch((err)=>{
		res.json(err)
	})

})


router.patch('/update-category',chechAuth,(req,res,next)=>{

	let cat_name = req.body.cat_name
	let id = req.body.id
	let edit = categoryModel.findByIdAndUpdate(id,{
		cat_name:cat_name
	})
	
	/*edit.exec((err,data)=>{
		if(err) throw err;
		res.status(201).json({
			msg:"Data Update succcessfully",
			result:data
		});
	})*/

	edit.exec()
	.then((data)=>{
		res.status(201).json({
			msg:"Data Update succcessfully",
			result:data
		});
	})
	.catch((err)=>{
		res.json(err)
	})
	
})


router.delete('/delete-category',(req,res,next)=>{
	let id = req.body.id
	let del = categoryModel.findByIdAndDelete(id)
	/*del.exec((err)=>{
		if(err) throw err;
		allCategory.exec((err,data)=>{
			if (err) throw err;
			res.json(data);
		})
	})*/
	del.exec()
	.then(data=>{
		res.status(201).json({
			msg:"succcessfully delete",
			result:data
		})
	})
	.catch(err=>{
		res.json(err)
	})
})



router.get('/getallpassword',(req,res,next)=>{
	let getAll = passwordModel.find()
	getAll
	.select("cat_name password project")
	.populate("cat_name")
	.exec()
	.then(data=>{
		res.status(201).json({
			msg:"succcessfully get",
			result:data
		})
	})
	.catch(err=>{
		res.json(err)
	})
})


router.post('/addpassword',(req,res,next)=>{
	let cat_name = req.body.cat_name
	let password = req.body.password
	let project = req.body.project

	let addpassword = new passwordModel({
		cat_name:cat_name,
		password:password,
		project:project
	})

	addpassword.save()
	.then(data=>{
		res.status(201).json({
			msg:"Succcessfully Insert data",
			result:data
		})
	})
	.catch(err=>{
		res.json(err)
	})
})



module.exports = router