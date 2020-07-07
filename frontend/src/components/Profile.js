import React, { Fragment,useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {fetchUserDetails,updateProfile} from "../redux/action/UserAction";
import Navber from './Navber';

import defaultProfilePic from '../uploads/profilePic.jpg'


const Profile = () => {
    // State
    const [picture,setPicture] = useState("")

    // Reducer Access
    const userDetails = useSelector(state => state.userReducer.userDetails)
    const userProfilePic = useSelector(state => state.userReducer.profilePic)
    const userEmail = useSelector(state => state.userReducer.email)
    const userName = useSelector(state => state.userReducer.username)
    const userId = useSelector(state => state.userReducer.userId)
    const userJoinDate = new Date(useSelector(state => state.userReducer.date))

    // Dispatch
    const dispatch = useDispatch()

    let pic = ""
    if(userProfilePic.length>0){
    	pic = "http://localhost:5000/profile/"+userProfilePic
    }else{
    	pic = defaultProfilePic
    }

    useEffect(()=>{
    	dispatch(fetchUserDetails(userDetails.id))
    },[userJoinDate])

    const fileUpload = ()=>{
        console.log(picture)
        dispatch(updateProfile(picture))
    }

    return (
        <Fragment>
    	<Navber/>
    	<div className="container">
    		<div className="row">
    			<div className="col-md-6 mt-4 justify-content-center">
					<img src={pic} className="col img-fluid" alt="profile_pic"/>
    			</div>
    			<div className="col-md-6 mt-4">
                    <small className="text-muted">You can only change your Profile Image</small>
					<form>
					  <div className="form-group">
					    <label htmlFor="exampleInputEmail1">Email address</label>
					    <input readOnly value={userEmail} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
					  </div>
					  <div className="form-group">
					    <label htmlFor="name">User name</label>
					    <input readOnly name="name" value={userName} type="text" className="form-control" id="name" />
					  </div>
					   <div className="form-group">
					    <label htmlFor="picture">Profile image</label>
					    <input required onChange={(e)=> setPicture(e.target.files[0])} name="picture" type="file" className="form-control" id="picture" />
					  </div>
					  <p className="text-muted">Join on {userJoinDate.getFullYear()}</p>
					  <button onClick={()=> fileUpload()} type="button" className="btn mb-5 btn-primary">UPDATE PROFILE</button>
					</form>
    			</div>
    		</div>
    	</div>
    </Fragment>
    )
}
export default Profile;
