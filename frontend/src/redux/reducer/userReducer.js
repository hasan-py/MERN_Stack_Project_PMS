const initialState = {
	isLoggedIn:false,
	username:"",
	userId:"",
	email:"",
	date:"",
	profilePic:"",
	msg:"",
	actions:"Signup",
	id:null,
	userDetails:{}
}

const userReducer = (state=initialState,action)=>{
	switch(action.type){
		case "SIGN_UP":
			return {
				...state,
				msg:action.payload,
			}
		case "LOGIN_MSG":
			return {
				...state,
				msg:action.payload,
				isLoggedIn:action.isLoggedIn
			}
		case "SET_CURRENT_USER":
			return {
				...state,
				userDetails:action.payload,
				isLoggedIn:true
			}
		case "LOGOUT":
			return {
				...state,
				isLoggedIn:false,
				username:"",
				userId:"",
				email:"",
				date:"",
				profilePic:"",
				msg:"",
				id:null,
				userDetails:{}
			}
		case "SET_DETAILS":
			return {
				...state,
				username:action.name,
				email:action.email,
				profilePic:action.profilePic,
				date:action.date,
				userId:action.userId
				
			}
		case "PIC":
			return {
				...state,
				profilePic:action.profilePic	
			}
		default:return state
	}
}

export default userReducer