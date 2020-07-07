import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import MainApp from './components';
import store from './redux/store.js';
import { setAuth } from './redux/action/setAuth';
import { setCurrentUser,logout } from './redux/action/UserAction'
import jwt from 'jsonwebtoken'

class App extends Component {
	
    render() {
    	// Verify Token & login logout setup
	    if (localStorage.token) {
	        setAuth(localStorage.token)
	    	jwt.verify(localStorage.token,'secret',(err,decode)=>{
	    		if(err){
	    			store.dispatch(logout())
	    		}else{
	    			store.dispatch(setCurrentUser(decode))
	    		}
	    	})
	    }

	    return (
	        <Provider store={store}>
				<Fragment>
					<div style={{  fontFamily: "'Raleway', sans-serif" }}>
						<MainApp/>
					</div>	
				</Fragment>
			</Provider>
	    );
    }
}
export default App;