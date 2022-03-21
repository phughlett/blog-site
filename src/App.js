import './App.css';
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import AppContext from './context/AppContext';
import Login from './views/login/Login';
import CreateAccount from './views/createaccount/CreateAccount';
import UserHomePage from './views/userHomePage/UserHomePage';
import Homepage from './views/homepage/Homepage';


function App() {

  const BASE_URL = 'http://localhost:8080'


  const [user, setUser] = useState([]);
  const [routeURL, setRouteURL] = useState('/login')


  const linkStyle = {
    color: '#61dafb',
    margin: '1em'
  }



  function login(username, password) {


    let body = JSON.stringify({username, password});

    return fetch(`${BASE_URL}/users/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    .then(response => response.json())
    .then((data) => {
      setUser(data[0])
      setRouteURL(data[0].username)

    })
    .catch(err => {
      let error = err.json();
      console.log(error)
    })


  }

  function createAccount(first_name, last_name ,username, password) {


    let body = JSON.stringify({first_name, last_name, username, password});

    return fetch(`${BASE_URL}/users/create`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    .then(response => response.json())
    .catch(err => console.log(err))


  }

  function PlaceholderPage() {

    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>

    )

  }

  function NoMatch() {

    const linkStyle = {
      color: '#61dafb',
      margin: '1em'
    }
    return (
      <div className="App-header">
        <h2>You must be lost!</h2>
        <p>
          <Link style={linkStyle} to="/">Go to the home page</Link>
        </p>
      </div>
    )
  }

  let contextObj = {
    login,
    createAccount,
    user,
    linkStyle

  }


  return (

    <AppContext.Provider value={contextObj}>

      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path={routeURL} element={<UserHomePage />} />
        <Route path='/signup' element={<CreateAccount />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AppContext.Provider>

  )
}

export default App;
