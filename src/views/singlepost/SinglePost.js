import './SinglePost.css';
import { useContext, useState, useEffect } from 'react';
import AppContext from '../../context/AppContext'
import { useNavigate, Link, useParams } from "react-router-dom";
import BasicUserCard from '../../components/BasicUserCard'

export default function SinglePost() {

  const [singlePost, setSinglePost] = useState([]);

  let { linkStyle, BASE_URL, user, routeURL } = useContext(AppContext)

  let { id } = useParams();



  useEffect(() => {

    fetch(`${BASE_URL}/posts/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setSinglePost(data[0]))
      .catch(err => console.log(err))
  }, [])






  return (

    <div className="single-homepage">
      <p>
        Welcome to the Dog Blog {user.id > 0 ? <><Link style={linkStyle} to="/">View All Posts</Link> Welcome, {user.first_name} {user.last_name}</> : <><Link style={linkStyle} to="/">View All Posts</Link><Link style={linkStyle} to="/login">Login Here</Link> <Link style={linkStyle} to="/signup">Create an Account</Link></>}
      </p>
      <BasicUserCard key={singlePost.id} post={singlePost} />

    </div>
  )
}