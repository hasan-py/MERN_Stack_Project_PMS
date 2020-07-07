import React,{Fragment} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {logout} from '../redux/action/UserAction'
import {Navbar,Nav,NavDropdown,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Navber = (props) => {
	const email = useSelector(state=>state.userReducer.userDetails.email)
	const dispatch = useDispatch()
  return (
    <Fragment>
    	<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
		  <Navbar.Brand href="/">PMS</Navbar.Brand>
		  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
		  <Navbar.Collapse id="responsive-navbar-nav">
		    <Nav className="mr-auto">
		      <NavDropdown title="Features" id="collasible-nav-dropdown">
		        <Link to="/" className="dropdown-item">
		        	Category
		        </Link>
		        <Link to="/password" className="dropdown-item">
		        	Password
		        </Link>
		      </NavDropdown>
		    </Nav>
		    <Nav>
		      <NavDropdown title={email} id="collasible-nav-dropdown">
		      <Link to="/profile" className="dropdown-item">
		        <i className="far fa-user-circle"></i> Profile
		      </Link>
		        <Link to="/profile" className="dropdown-item">
		        <i className="fas fa-cog"></i> Setting
		        </Link>
		        <NavDropdown.Divider />
		        <NavDropdown.Item onClick={()=> dispatch(logout())}><i className="fas fa-sign-out-alt"></i> Logout</NavDropdown.Item>
		      </NavDropdown>
		    </Nav>
		  </Navbar.Collapse>
		</Navbar>
    </Fragment>
  )
}
export default Navber;