import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import AppContext from './context/AppContext';
import Login from './views/login/Login';
import CreateAccount from './views/createaccount/CreateAccount';


function App() {

  const BASE_URL = 'http://localhost:8080'

  const [loginBool, setLoginBool] = useState(false);
  const [user, setUser] = useState([]);


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
    .then(data => setUser(data))
    .then(() => setLoginBool(true))

    .catch(err => console.log(err))


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

  let contextObj = {
    login,
    createAccount

  }


  return (

    <AppContext.Provider value={contextObj}>

      <Routes>
        <Route path='/' element={<PlaceholderPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<PlaceholderPage />} />
        <Route path='/signup' element={<CreateAccount />} />
      </Routes>
    </AppContext.Provider>

  )
}

export default App;
