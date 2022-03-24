import './App.css';
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import AppContext from './context/AppContext';
import Login from './views/login/Login';
import CreateAccount from './views/createaccount/CreateAccount';
import UserHomePage from './views/userHomePage/UserHomePage';
import Homepage from './views/homepage/Homepage';
import SinglePost from './views/singlepost/SinglePost';


function App() {

  const BASE_URL = 'https://blogsite-backend-sdi08.herokuapp.com'
  const APP_BASE_URL = 'https://main.d2ozcvlq8y7tm5.amplifyapp.com'
  const navigate = useNavigate();


  const [user, setUser] = useState([]);
  const [routeURL, setRouteURL] = useState('/login')
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);


  const linkStyle = {
    color: '#61dafb',
    margin: '1em'
  }


  useEffect(() => {

    fetch(`${BASE_URL}/posts`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => data.reverse())
    .then(reverse => setPosts(reverse))
    .catch(err => console.log(err))
  }, [])



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
    linkStyle,
    BASE_URL,
    posts,
    routeURL,
    APP_BASE_URL,
    setPosts,
    navigate,
    userPosts,
    setUserPosts

  }


  return (

    <AppContext.Provider value={contextObj}>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path={routeURL} element={<UserHomePage />} />
        <Route path='/signup' element={<CreateAccount />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="/:id" element={<SinglePost/>} />
      </Routes>
    </AppContext.Provider>

  )
}

export default App;
