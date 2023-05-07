import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function LoginCheck({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const checkLoggedIn = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.get('/api/protected', { headers: { Authorization: token } });
        const decoded = jwtDecode(token);
        setUser(decoded.UserID); // Assuming the username is stored in the JWT token
        setLoggedIn(true);
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);
  
  if (loggedIn) {
    console.log("Logged in user " + {user})
    return children; // Render the child components
  } else {
    return <Button href="/" color="secondary" style={{ margin: '1.75em', marginTop: '0.6em' }} variant="contained" type="button">Login / Register</Button>;

    // You can also redirect the user to the login page here
  }
}

export default LoginCheck;
