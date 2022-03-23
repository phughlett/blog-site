import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AppContext from '../context/AppContext'


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function AuthUserBasicCard({ post }) {

  const [title, setTitle] = React.useState(post.title)
  const [content, setContent] = React.useState(post.content)


  let { BASE_URL, routeURL, navigate, setUserPosts, user } = React.useContext(AppContext);

  let created = new Date(post.created_at);
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  let time = created.toLocaleTimeString('en-US')
  let date = created.toLocaleDateString('en-US', options)


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

  let updatePost = (e) => {
    e.preventDefault();
    let body = JSON.stringify({ title, content })
    fetch(`${BASE_URL}/posts/${post.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
      .then(response => response.json())
      .then(() => {
        handleClose()
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
      })
      .catch (err => console.log(err))

}

let deletePost = (e) => {
  e.preventDefault()

  fetch(`${BASE_URL}/posts/${post.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },

  })
    .then(response => response.json())
    .then(() => {
      handleClose()
      navigate(routeURL)
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
    })
    .catch(err => console.log(err))
}






return (
  <Card variant="outlined" sx={{ minWidth: 345, maxWidth: 1800, width: '100%', backgroundColor: '#30333a', border: 'solid 1px rgb(138 165 162 / 36%)', margin: '.25em' }}>
    <CardContent>
      <Typography sx={{ fontSize: 14, }} color="text.secondary" gutterBottom>

      </Typography>
      <Typography variant="h5" sx={{ color: 'white', fontWeight: "bold" }} component="div">
        {post.title}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="rgb(138 165 162 / 36%)">
        Posted at {time} on {date}
      </Typography>
      <Typography sx={{ color: 'white' }} variant="body2">
        {post.content}
      </Typography>
    </CardContent>
    <CardActions sx={{}}>
      <Button sx={{ color: '#61dafb' }} size="small" onClick={handleOpen}>Edit</Button>
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
              <input style={{ backgroundColor: '#30333a', color: 'white', width: '394px' }} placeholder={post.title} onChange={(e) => setTitle(e.target.value)}></input><br />
              <label style={{
                textAlign: 'left',
                color: 'white',
                fontFamily: '"Roboto","Helvetica","Arial",sans-serif'
              }}>Content </label>
              <textarea style={{ backgroundColor: '#30333a', color: 'white', fontFamily: '"Roboto","Helvetica","Arial",sans-serif', width: '394px', height: '186px', resize: 'none' }} value={content} onChange={(e) => setContent(e.target.value)} /><br />
              <Button variant="contained" color="success" type="submit" onClick={(e) => updatePost(e)}>Update</Button>
              <Button style={{ float: 'right' }} variant="contained" color="error" onClick={e => deletePost(e)}>Delete</Button>
            </form>

          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          </Typography>
        </Box>
      </Modal>
    </CardActions>
  </Card >
);

}