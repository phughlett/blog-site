import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { useContext, useState } from 'react';
import AppContext from '../context/AppContext'

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);




export default function BasicUserCard({ post }) {


  const [copyState, setCopyState] = useState("")

  let { APP_BASE_URL } = useContext(AppContext);



  let created = new Date(post.created_at);
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  let time = created.toLocaleTimeString('en-US')
  let date = created.toLocaleDateString('en-US', options)

  let navigate = useNavigate();

  let copyToClipboard = () => {
    navigator.clipboard.writeText(`${APP_BASE_URL}/${post.id}`)
    setCopyState('Link copied to clipboard!')

  }





  return (
    <Card variant="outlined" sx={{ minWidth: 345, maxWidth: 1800, width: '100%', backgroundColor: '#30333a', border: 'solid 1px rgb(138 165 162 / 36%)', margin: '.25em', color: 'white', fontSize:'.5em'}}>
      <CardContent onClick={() => navigate(`/${post.id}`)}>
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
        <Button sx={{ color: '#61dafb' }} size="small" onClick={() => { copyToClipboard()}}
        >Share</Button>
      </CardActions>
      {copyState}
    </Card>
  );
}