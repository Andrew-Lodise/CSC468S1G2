// src/components/CreatePost.js
import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Grid, Button, TextField, TextareaAutosize } from '@mui/material';

const CreatePost = () => {
  const [content, setContent] = useState('');
  
  let userVariable=0;

  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userVariable = decoded.UserID; // Assuming the username is stored in the JWT token
    } catch (error) {
      console.log(error.response.data.error);
    }
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userVariable, content }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setContent('');
          alert('Post created successfully!');
          
        } else {
          alert('Error creating post');
        }
      });
      window.location.reload(false);

  };

  return (
    <>



      <h4>Create Post</h4>
      <form onSubmit={handleSubmit}>
      <Grid item sm={6}>
        <TextField
            fullWidth
            multiline
            label="Enter your code to post here"
            InputProps={{
                inputComponent: TextareaAutosize,
                rows: 3
            }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />
    </Grid>
        <br />
        <Button style={{ margin: '1.75em', marginTop: '0.6em' }} variant="contained" type="submit">Create Post</Button>
      </form>
    </>
  );
};

export default CreatePost;
