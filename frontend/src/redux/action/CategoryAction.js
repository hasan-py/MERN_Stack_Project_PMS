const axios = require('axios')

// All Action Type
const ADD_CAT = 'ADD_CAT'
const FETCH_CAT = 'FETCH_CAT'
const UPDATE_CAT = 'UPDATE_CAT'
const UPDATE_DONE = 'UPDATE_DONE'
const CHANGE_CAT = 'CHANGE_CAT'
const DELETE_CAT = 'DELETE_CAT'


export const fetchCategory = (user_id)=>{
	
	return (dispatch)=>{
		const OPTIONS = {
			url:"http://localhost:5000/api/category/"+user_id,
			method:"GET",
			headers:{
				"content-type":"application/json"
			}
		}
		axios(OPTIONS)
		.then(res=>{
			const allCategory = res.data.result
			dispatch(getFetchCategory(allCategory))
		})
		.catch(err=>{
			console.log(err)
		})

	}

}

export const getFetchCategory = (allCategory)=>{
	return {
		type:FETCH_CAT,
		payload:allCategory
	}
}

export const changeCat = ()=>{
	return {
		type:CHANGE_CAT,
		payload:""
	}
}


export const addCategory = (category,user_id)=>{

	const OPTIONS = {
		url:"http://localhost:5000/api/category/add-category",
		method:"POST",
		data:{
			cat_name:category,
			user_id:user_id
		},
		headers:{
			"content-type":"application/json"
		}
	}
	axios(OPTIONS)
	.then(res=>{
		console.log(res)
	})
	.catch(err=>{
		console.log(err)
	})
	return {
		type:ADD_CAT,
		payload:category
	}

}

export const updateCategory = (id,cat_name)=>{

	return {
		type:UPDATE_CAT,
		payload:cat_name,
		id:id,
		actions:"Edit"
	}

}

export const updateCategoryPost = (id,category)=>{
	console.log(id)
	const OPTIONS = {
		url:"http://localhost:5000/api/category/add-put-category",
		method:"PUT",
		data:{
			id:id,
			cat_name:category
		},
		headers:{
			"content-type":"application/json"
		}
	}
	axios(OPTIONS)
	.then(res=>{
		console.log(res)
	})
	.catch(err=>{
		console.log(err)
	})
	return {
		type:UPDATE_DONE,
		payload:"Category update succcessfully.",
		actions:"Add",
		id:null,
		cat:""
	}

}

export const deleteCategory = (id)=>{
	console.log(id)
	const OPTIONS = {
		url:"http://localhost:5000/api/category/delete-category",
		method:"DELETE",
		data:{
			id:id,
		},
		headers:{
			"content-type":"application/json"
		}
	}
	axios(OPTIONS)
	.then(res=>{
		console.log(res)
	})
	.catch(err=>{
		console.log(err)
	})
	return {
		type:DELETE_CAT,
		payload:"Category Delete succcessfully.",
		actions:"Add",
		id:null,
		cat:""
	}

}