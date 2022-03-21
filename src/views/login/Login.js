import './Login.css';
import {useContext, useState} from 'react';
import AppContext from '../../context/AppContext'
import {useNavigate, Link} from "react-router-dom";


export default function Login(){

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  let {login, linkStyle} = useContext(AppContext);
  let navigate = useNavigate();

  let handleSubmit = (e) => {
    e.preventDefault();
    login(username, password)
    .then(() => navigate(`/${username}`))
  }




  return(
    <div className="login">
      <h3>Login Here</h3>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" required onChange={e => setUserName(e.target.value)}></input><br/>
        <label>Password </label>
        <input type="password" required onChange={e => setPassword(e.target.value)}></input><br/>
        <button type="submit" className="button-login">Login</button>
      </form>
      <Link style={linkStyle} to="/signup">Need an account? Sign up here</Link>
    </div>
  )
}