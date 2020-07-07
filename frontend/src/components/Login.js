import React,{Fragment,useState} from 'react';
import {Link} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {login} from "../redux/action/UserAction"


const Form = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()
    const message = useSelector(state=>state.userReducer.msg)

    const loginSubmit = ()=>{
        dispatch(login(email,password))
        setEmail('')
        setPassword('')
    }

  return (
    <Fragment>
            { message ? message : ""}
    		<div className="form-group">
    			<label htmlFor="email" >Email</label>
    			<input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" id="email" className="form-control" />
    		</div>
    		<div className="form-group">
    			<label htmlFor="password" >Password</label>
    			<input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" id="password" className="form-control" />
    		</div>
    		<button onClick={()=> loginSubmit()} type="button" className="btn btn-dark">LOGIN</button>
    </Fragment>
  )
}

const Login = ()=>{
    return (
        <Fragment>
            <div className="row mt-5 p-5">
                <div className="col-md-6 offset-md-3">
                    <h1 className="text-center mb-5">PMS LOGIN</h1>
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

export default Login;