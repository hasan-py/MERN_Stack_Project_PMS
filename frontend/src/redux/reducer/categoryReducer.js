const initialState = {
	category:'',
	allCategory:[],
	msg:"",
	actions:"Add",
	id:null,
}

const passReducer = (state=initialState,action)=>{
	switch(action.type){
		case "FETCH_CAT":
			return {
				...state,
				allCategory:action.payload
			}
		case "CHANGE_CAT":
			return {
				...state,
				category:action.payload
			}
		case "ADD_CAT":
			return{
				...state,
				category:action.payload
			}
		case "UPDATE_CAT":
			return {
				...state,
				category:action.payload,
				id:action.id,
				actions:action.actions,
			}
		case "UPDATE_DONE":{
			return {
				...state,
				msg:action.payload,
				actions:action.actions,
				category:action.cat,
				id:action.id,
			}
		}
		case "DELETE_CAT":{
			return {
				...state,
				msg:action.payload,
				actions:action.actions,
				category:action.cat,
				id:action.id,
			}
		}
		default:return state
	}
}

export default passReducer