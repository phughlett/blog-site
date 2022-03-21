import './UserHomePage.css';
import { useContext, useState } from 'react';
import AppContext from '../../context/AppContext'
import {Link} from "react-router-dom";


export default function UserHomePage() {



  let { userAuthenticated, user } = useContext(AppContext);




  if (userAuthenticated) {

    return (
      <div className="user-homepage">
        <p>This is an authenticated User homepage.</p>
        <p>Hello, {user.first_name} {user.last_name}</p>

      </div>

    )
  } else {


    return (
      <div>
        <Link to="/login">Sign in here!</Link>
      </div>

    )
  }






}