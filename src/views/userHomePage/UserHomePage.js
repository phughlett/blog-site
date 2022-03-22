import './UserHomePage.css';
import { useContext, useState, useEffect } from 'react';
import AppContext from '../../context/AppContext'
import { Link } from "react-router-dom";
import AuthUserBasicCard from '../../components/AuthUserBasicCard';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import Box from '@mui/material/Box';


export default function UserHomePage() {

  const [userPosts, setUserPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')

  let { user, linkStyle, BASE_URL } = useContext(AppContext);

  let newPost = (e) => {
    let title = newPostTitle;
    let content = newPostContent;

    let body = JSON.stringify({title, content});
    e.preventDefault();

    fetch(`${BASE_URL}/users/${user.id}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    .then(() => {
      handleClose()
      setNewPostTitle('')
      setNewPostContent('')
    })
  }

  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#30333a',
    border: 'solid 1px rgb(138 165 162 / 36%)',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
  };



  useEffect(() => {

    fetch(`${BASE_URL}/users/${user.id}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => data.reverse())
      .then(reverse => setUserPosts(reverse))
      .catch(err => console.log(err))
  }, [])


  return (


    <div className="user-homepage">
      <p>Welcome to the Dog Blog  <Link style={linkStyle} to="/">View All Posts</Link> Welcome, {user.first_name} {user.last_name}</p>
      <p><Button sx={{ color: '#61dafb' }} size="small" onClick={handleOpen}>New Post</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <form>
                <label style={{
                  textAlign: 'left',
                  color: 'white',
                  fontFamily: '"Roboto","Helvetica","Arial",sans-serif'
                }}>
                  Title
                </label>
                <input style={{ backgroundColor: '#30333a', color: 'white', width: '394px' }} required placeholder={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)}></input><br />
                <label style={{
                  textAlign: 'left',
                  color: 'white',
                  fontFamily: '"Roboto","Helvetica","Arial",sans-serif'
                }}>Content </label>
                <textarea style={{ backgroundColor: '#30333a', color: 'white', fontFamily: '"Roboto","Helvetica","Arial",sans-serif', width: '394px', height: '186px', resize: 'none' }} value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} /><br />
                <Button variant="contained" color="success" type="submit" onClick={(e) => newPost(e)}>Submit</Button>
              </form>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>

            </Typography>
          </Box>
        </Modal></p>


      {userPosts.map((post) => <AuthUserBasicCard key={post.id} post={post} />)}

    </div>

  )

}