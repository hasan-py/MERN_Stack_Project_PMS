import React, { Fragment } from 'react';
import {useSelector,useDispatch} from 'react-redux'

import Category from './Category';
import Navber from './Navber'
import {signup} from "../redux/action/UserAction"


import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



const MainApp = ()=> {
	
	const isLoggedIn = useSelector(state=>state.userReducer.isLoggedIn)
	let showComponent

	return (
		<Fragment>
		<Router>
			<Switch>
				<Route exact path="/">
					{ isLoggedIn === false ? <Login /> : <Fragment> <Navber/><Category/> </Fragment> }
				</Route>
				<Route path="/signup">
					{ isLoggedIn === false ? <Signup /> : <Fragment> <Navber/><Category/> </Fragment> }
				</Route>
				<Route path="/profile">
					{ isLoggedIn === false ? <Login /> : <Profile/> }
				</Route>
			</Switch>
		</Router>
		</Fragment>
	);
}

export default MainApp;