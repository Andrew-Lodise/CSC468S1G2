import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const RegisterPage = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', { user, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
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

            < TextField 
              style={{ margin: '0.5vw', marginTop: '0' }}
              id="outlined-basic" 
              label="Password" 
              variant="outlined" 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

      <Button style={{ margin: '1.75em', marginTop: '0.6em' }} variant="contained" type="submit">Register</Button>
      </form>
      {message && <p>{message}</p>}
    </div>

  );
};

export default RegisterPage;