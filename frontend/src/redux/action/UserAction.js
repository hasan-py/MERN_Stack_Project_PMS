import {setAuth} from './setAuth';
import axios from 'axios';
import jwt from 'jsonwebtoken'

// All Action Type
const SIGN_UP = 'SIGN_UP'
const LOGIN = 'LOGIN'
const LOGIN_MSG = 'LOGIN_MSG'
const SET_CURRENT_USER = 'SET_CURRENT_USER'
const LOGOUT = 'LOGOUT'
const SET_DETAILS = 'SET_DETAILS'


export const signup = (name,email,password,cPassword)=>{
	
	return (dispatch)=>{
		const OPTIONS = {
			url:"http://localhost:5000/api/user/register",
			method:"POST",
			data:{
				name:name,
				email:email,
				password:password,
				confirmPassword:cPassword
			},
			headers:{
				"content-type":"application/json"
			}
		}
		axios(OPTIONS)
		.then(res=>{
			console.log(res.data.message)
			dispatch(signupMsg(res.data.message))
		})
		.catch(err=>{
			console.log(err)
		})

	}
}

export const signupMsg = (msg)=>{
	return {
		type:SIGN_UP,
		payload:msg
	}
}

export const login = (email,password)=> {

	return (dispatch)=>{
		const OPTIONS = {
			url:"http://localhost:5000/api/user/login",
			method:"POST",
			data:{
				email:email,
				password:password,
			},
			headers:{
				"content-type":"application/json"
			}
		}
		axios(OPTIONS)
		.then(res=>{
			console.log(res.data)
			let token = res.data.token
			setAuth(token)
			console.log(jwt.decode(token))
			dispatch(setCurrentUser(jwt.decode(token)))
			dispatch(loginMsg(res.data.message,token))
		})
		.catch(err=>{
			console.log(err)
		})

	}
}

export const loginMsg = (msg,token)=>{
	if(token){
		localStorage.setItem('token',token)
		return {
			type:LOGIN_MSG,
			payload:msg,
			isLoggedIn:true
		}
	}else{
		return {
			type:LOGIN_MSG,
			payload:msg,
			isLoggedIn:false
		}
	}
}


export const setCurrentUser = (user)=>{
	if(user){
		return {
			type:SET_CURRENT_USER,
			payload:user,
			isLoggedIn:true
		}
	}
}


export const logout = ()=>{
	return (dispatch)=>{
		localStorage.removeItem('token')
		setAuth(false)
		dispatch(setCurrentUser({}))
		dispatch({
			type:LOGOUT,
		})
		window.location.href="/";
	}
}

export const fetchUserDetails = (user_id)=>{
	return (dispatch)=>{
		const OPTIONS = {
			url:"http://localhost:5000/api/user/fetchUserDetails/"+user_id,
			method:"GET",
			headers:{
				"content-type":"application/json"
			}
		}
		axios(OPTIONS)
		.then(res=>{
			dispatch(setUserDetails(res.data,user_id))
			
		})
		.catch(err=>{
			console.log(err)
		})
	}
}

export const setUserDetails = (data,id)=>{
	console.log(data)
	return {
		type:SET_DETAILS,
		email:data.result[0].email,
		name:data.result[0].name,
		profilePic:data.result[0].image,
		date:data.result[0].date,
		userId:id
	}
}


export const updateProfile = (image)=>{

	const formData = new FormData()
	formData.append('pic',image)

	return (dispatch)=>{
		const OPTIONS = {
			url:"http://localhost:5000/api/user/edit-profile",
			method:"POST",
			data:formData,
			headers:{
				"content-type":'application/json'
			}
		}
		axios(OPTIONS)
		.then(res=>{
			console.log(res.data)
			dispatch(setUserPic(res.data.image))
			
		})
		.catch(err=>{
			console.log(err)
		})
	}
}

export const setUserPic = (image)=>{
	return {
		type:'PIC',
		profilePic:image
	}
}
