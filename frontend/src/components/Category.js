import React,{useState,useEffect} from 'react';
import {fetchCategory,addCategory,updateCategory,updateCategoryPost,deleteCategory} from "../redux/action/CategoryAction"
import {useSelector,useDispatch} from 'react-redux' // Dispatch must need a fucntion()


const GetCategory = ()=> {

	const [delCat,setDelCat] = useState("false")
	const initialcategory = useSelector(state=>state.categoryReducer.allCategory)
	const user_id = useSelector(state=>state.userReducer.userDetails.id)
	const dispatch = useDispatch()
	
	useEffect(()=>{
		dispatch(fetchCategory(user_id))
		console.log(initialcategory)
	},[])

	useEffect(()=>{
		dispatch(fetchCategory(user_id))
		console.log("Delete Done and fetch")
	},[delCat])

	const deleteCat =(id)=>{
		dispatch(deleteCategory(id))
		if(delCat==="false"){
			setDelCat("true")
		}else{
			setDelCat("false")
		}
	}

  return (
		<div>
			<h3 className="p-2">Category List</h3>
			<table className='table'>
				<thead>
					<tr>
						<th>Category Name</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{
						initialcategory.length>0 ? 
						(initialcategory.map((item,index)=>{
							return(
								 <tr key={index}>
								    <td>{item.cat_name}</td>
								    <td>
								    	<button onClick={()=> dispatch(updateCategory(item._id,item.cat_name)) } className="btn btn-sm mx-1 btn-dark"><i className="fas fa-edit"></i></button>
								    	<button onClick={()=> deleteCat(item._id) } className="btn btn-sm mx-1 btn-dark"><i className="fas fa-trash-alt"></i></button>
								    </td>
								 </tr>
							)
						}))
						:
						(
							<tr><td className="col-3"><strong>No result found</strong></td></tr>
						)
					}
				</tbody>
			</table>
		</div>
  )
}


const AddCategory = () => {

	const [category,setCategory] = useState("")
	const categoryState = useSelector(state=>state.categoryReducer.category)
	const initialcategory = useSelector(state=>state.categoryReducer.allCategory)
	const actions = useSelector(state=>state.categoryReducer.actions)
	const msg = useSelector(state=>state.categoryReducer.msg)
	const id = useSelector(state=>state.categoryReducer.id)
	const user_id = useSelector(state=>state.userReducer.userDetails.id)
	const dispatch = useDispatch()

	let inputButton
	let input
	let smsg


	const addCatIntoState = ()=>{
		dispatch(addCategory(category,user_id))
		setCategory("")
	}

	const editCatIntoState = (id)=>{
		dispatch(updateCategoryPost(id,categoryState))
		console.log(categoryState)
	}

	useEffect(()=>{
		dispatch(fetchCategory(user_id))
	},[categoryState])
	

	if(actions==="Add"){
		input = <input className='form-control col-md-8 my-2' type="text" value={category} onChange={(e)=> setCategory(e.target.value)} />
		inputButton = <button onClick={()=> addCatIntoState() } type="button" className="btn btn-dark">Add Category</button>
	}else if(actions==="Edit") {
		input = <input className='form-control col-md-8 my-2' type="text" value={categoryState} onChange={(e)=> dispatch({type:"CHANGE_CAT",payload:e.target.value})} />
		inputButton = <button onClick={()=> editCatIntoState(id) } type="button" className="btn btn-info">Update Category</button>
	}

	if(msg.length>0){
		smsg = <div className="alert alert-success alert-dismissible fade show" role="alert">
				  <strong>{msg}</strong>
				  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
				    <span aria-hidden="true">&times;</span>
				  </button>
				</div>
	}
	
  return (
    <div>
    	<div className="container">
			<div className="row">
				<div className="col-md-5 mt-5">
			    	<div className="container">
			    		{smsg}
						<h1>{actions} Category</h1>
				    	{input}
				    	{inputButton}
			    	</div>
				</div>
				<div className="col-md-7 mt-5">
					<GetCategory/>
				</div>
			</div>
    	</div>
    	
    </div>
  )
}

export default AddCategory;