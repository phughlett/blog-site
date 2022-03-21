import './CreateAccount.css';
import { useContext, useState } from 'react';
import AppContext from '../../context/AppContext'
import { useNavigate, Link } from "react-router-dom";


export default function CreateAccount() {

  const [first_name, setfirstName] = useState();
  const [last_name, setLastName] = useState();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();


  let { createAccount, linkStyle } = useContext(AppContext);
  let navigate = useNavigate();

  let handleSubmit = (e) => {
    e.preventDefault();
    createAccount(first_name, last_name, username, password)
      .then(() => navigate('/login'))

  }




  return (
    <div className="login">
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input type="text" required onChange={e => setfirstName(e.target.value)}></input><br />
        <label>Last Name</label>
        <input type="text" required onChange={e => setLastName(e.target.value)}></input><br />
        <label>Username</label>
        <input type="text" required onChange={e => setUserName(e.target.value)}></input><br />
        <label>Password </label>
        <input type="password" required onChange={e => setPassword(e.target.value)}></input><br />
        <button type="submit" className="button-login">Sign Up</button>
      </form>
      <Link style={linkStyle} to="/login">Already have an Account?  Sign in here</Link>
      <br />

    </div>
  )
}