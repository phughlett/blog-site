import './Homepage.css';
import { useContext, useState, useEffect } from 'react';
import AppContext from '../../context/AppContext'
import { useNavigate, Link } from "react-router-dom";
import BasicUserCard from '../../components/BasicUserCard'

export default function Homepage() {

  let {linkStyle, posts, user, routeURL, setPosts, BASE_URL} = useContext(AppContext)

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




  return (

    <div className="basic-homepage">
    <p>
      Welcome to the Dog Blog {user.id > 0 ? <><Link style={linkStyle} to={routeURL}>View your posts</Link> Welcome, {user.first_name} {user.last_name}</> : <><Link style={linkStyle} to="/login">Login Here</Link> <Link style={linkStyle} to="/create">Create an Account</Link></>}
    </p>


    {posts.map((post) => <BasicUserCard key={post.id} post={post} />)}

  </div>
  )
}