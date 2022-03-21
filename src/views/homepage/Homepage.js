import './Homepage.css';
import { useContext, useState } from 'react';
import AppContext from '../../context/AppContext'
import { useNavigate, Link } from "react-router-dom";

export default function Homepage() {

  let {linkStyle} = useContext(AppContext)



  return (
    <div className="user-homepage">
      <header className="user-homepage-header">
        <Link style={linkStyle} to="/login">Login</Link>
      </header>
    </div>
  )
}