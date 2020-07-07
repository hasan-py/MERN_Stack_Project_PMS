import axios from 'axios';

export const setAuth = (token)=>{
	if(token){
		axios.defaults.headers.common['token'] = `Bearer ${token}`
	}else{
		delete axios.defaults.headers.common['token']
	}
}