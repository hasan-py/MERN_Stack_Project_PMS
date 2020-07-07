import React,{Fragment,useState,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {signup} from "../redux/action/UserAction"
import {useSelector,useDispatch} from 'react-redux'

const Form = () => {
	const [name,setName] = useState("")
	const [email,setEmail] = useState("")
	const [password,setPassword] = useState("")
	const [cPassword,setCPassword] = useState("")
	
	const message = useSelector(state=>state.userReducer.msg)
	const signUpDone = useSelector(state=>state.userReducer.signUpDone)
	const dispatch = useDispatch()
	let nameError
	let emailError
	const signUpReq = ()=>{
		dispatch(signup(name,email,password,cPassword))
		console.log("clicked sign up")
	}

	let dispalyMessage

	if(message.substr(-1)==='y'){
		dispalyMessage = 
		<div className="alert alert-success alert-dismissible fade show" role="alert">
		 {message}
		  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
		    <span aria-hidden="true">&times;</span>
		  </button>
		</div>
	}else{
		dispalyMessage = <div className="alert alert-warning alert-dismissible fade show" role="alert">
		 {message}
		  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
		    <span aria-hidden="true">&times;</span>
		  </button>
		</div>
	}

  return (
    <Fragment>
    	<div>
    	<h4>{message ? dispalyMessage : ""}</h4>
    	</div>
    		<div className="form-group">
    			<label htmlFor="name" >Name</label>
    			<input value={name} onChange={(e)=> setName(e.target.value)} type="text" id="name" className="form-control" />
    		</div>
    		<div className="form-group">
    			<label htmlFor="email" >Email</label>
    			<input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" id="email" className="form-control" />
    		</div>
    		<div className="form-group">
    			<label htmlFor="password" >Password</label>
    			<input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" id="password" className="form-control" />
    		</div>
    		<div className="form-group">
    			<label htmlFor="confirmPassword" >Confirm Password</label>
    			<input value={cPassword} onChange={(e)=> setCPassword(e.target.value)} type="password" id="confirmPassword" className="form-control" />
    		</div>
    		<button onClick={()=> signUpReq()} type="button" className="btn btn-dark">SIGNUP</button>
    </Fragment>
  )
}


const Signup = ()=>{
	return (
		<Fragment>
			<div className="row mt-5 p-5">
				<div className="col-md-6 offset-md-3">
				<h1 className="text-center mb-5">PMS SIGNUP</h1>
					<div className="card">
						<div className="card-header">
							<div className="row text-center">
								<span className="float-left col-md-6 col-xs-6" ><Link to="/signup">Signup</Link></span>
								<span className="float-right col-md-6 col-xs-6" ><Link to="/">Login</Link></span>
							</div>
						</div>
						<div className="card-body">
							<Form/>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default Signup;