import {createStore,applyMiddleware,combineReducers} from 'redux';
import categoryReducer from './reducer/categoryReducer';
import userReducer from './reducer/userReducer';


const thunkMiddleware = require('redux-thunk').default;
const mainReducer = combineReducers({
	categoryReducer,
	userReducer
})

const store = createStore(mainReducer,applyMiddleware(thunkMiddleware));
export default store;