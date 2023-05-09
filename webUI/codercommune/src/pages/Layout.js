import { Outlet } from "react-router-dom";
import { Grid, Drawer, AppBar, Toolbar, Typography, Button } from '@mui/material';
import Logo from '../assets/logo/LogoFinalAsset 1@2x.png'
import { useState } from "react";
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useEffect } from "react";


const Layout = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const checkLoggedIn = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.get('/api/protected', { headers: { Authorization: token } });
        const decoded = jwtDecode(token);
        setUser(decoded.UserName); // Assuming the username is stored in the JWT token
        setLoggedIn(true);
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setLoggedIn(false);
    window.location.reload(false);
  };




  return (
    <Grid container spacing={2}>

      <Grid item xs={12}>
        <AppBar style={{ background: 'WhiteSmoke', color: 'black', position: 'relative', zIndex: 1400}} >
            <Toolbar style={{padding: '20px', zIndex:'25'}}>

                <img sx={{ flexGrow: 1 }} style={{ width: '700px', height: '85px', padding: '20px'  }} src={Logo} alt="CoderCommune Logo"/>
            </Toolbar>
        </AppBar>
      </Grid>

      <Grid item xs={1}>
        <Drawer variant="permanent">
          <nav style={{paddingRight:'35px', height: '100%', justifyContent:'center',background: 'WhiteSmoke', display:'flex', alignItems: 'center'}}>
              <ul style={{ listStyle: 'none'}}>
                <li>
                  {loggedIn ? (
                  <div>
                  <p>Logged in User: {user}</p>
                  <Button color="secondary" style={{ margin: '1.75em', marginTop: '0.6em' }} variant="contained" onClick={handleLogout} type="submit">Log Out</Button>
                  </div>
                  ) : (
                  <Typography>
                    <p>Please log in to continue.</p>
                    <Button href="/" color="secondary" style={{ margin: '1.75em', marginTop: '0.6em' }} variant="contained" type="button">Login / Register</Button>
                  </Typography>
                  )}
                </li>
                <li>
                    <Button href="/" color="primary" style={{}} size="large" variant="text" type="button">Home</Button>
                </li>
                <li>
                    <Button href="/WhatsHappening" color="primary" style={{}} size="large" variant="text" type="button">What's Happening</Button>
                </li>
                <li>
                <Button href="/AboutUs" color="primary" style={{}} size="large" variant="text" type="button">About Us</Button>
                </li>
                <li>
                <Button href="/Contact" color="primary" style={{}} size="large" variant="text" type="button">Contact</Button>

                </li>
              </ul>
          </nav>
        </Drawer>
      </Grid>

      <Grid item xs={11} style={{ marginLeft: '350px' }}>
      <Outlet />
      </Grid>
    </Grid>
  );



};

export default Layout;