// src/LoginComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


const LoginComponent = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  var errorMessage;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { user, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setMessage(response.data.message);
      window.location.assign("/WhatsHappening")
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        errorMessage = "Wrong Username/Password";
      } else { errorMessage= 'Error: ' +error.message;}
      setMessage(errorMessage);
    }
  };

  
  const [loggedIn, setLoggedIn] = useState(false);

  const checkLoggedIn = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.get('/api/protected', { headers: { Authorization: token } });
        setLoggedIn(true);
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
  };
  console.log(loggedIn);
  checkLoggedIn();

  return (
        <div>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>

            <TextField 
              style={{ margin: '0.5vw', marginTop: '0' }}
              id="outlined-basic" 
              label="Username" 
              variant="outlined" 
              type="user"
              placeholder="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <TextField 
              style={{ margin: '0.5vw', marginTop: '0' }}
              id="outlined-basic" 
              label="Password" 
              variant="outlined" 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button style={{ margin: '1.75em', marginTop: '0.6em' }} variant="contained" type="submit">Login</Button>
          </form>
          {message && <p>{message}</p>}

        </div>
  );
};

export default LoginComponent;