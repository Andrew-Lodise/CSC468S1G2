import { Outlet, Link } from "react-router-dom";
import { Grid, Drawer, AppBar, Toolbar, Typography, Button, IconButton, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../assets/logo/LogoFinalAsset 1@2x.png'
import { useState } from "react";
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useEffect } from "react";
import LoginCheck from "./header/LoginCheck";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
const style = {
  top: '20%',
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
  alignItems: 'center',
  justifyContent: 'center'
};

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
                <IconButton
                    size="large"
                    edge="start"
                    color="black"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <img sx={{ flexGrow: 1 }} style={{ width: '700px', height: '85px', padding: '20px'  }} src={Logo} alt="CoderCommune Logo"/>
            </Toolbar>
        </AppBar>
      </Grid>

      <Grid item xs={1}>
        <Drawer variant="permanent" style={{ }}>
            <List sx={style} component="nav" aria-label="mailbox folders">
          <ListItem style={{paddingBottom: '35px'}} button>
          {loggedIn ? (
                <div>
                <h2>{user}</h2>
                <Button color="secondary" style={{ margin: '1.75em', marginTop: '0.6em' }} variant="contained" onClick={handleLogout} type="submit">Log Out</Button>

                </div>
                ) : (
                <Typography>
                  <p>Please log in to continue.</p>
                  <Button href="/" color="secondary" style={{ margin: '1.75em', marginTop: '0.6em' }} variant="contained" type="button">Login / Register</Button>
                </Typography>
                )}
          </ListItem>
          <Divider />
          <ListItem href="/" button divider>
            <ListItemText  primary="Home" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Trash" />
          </ListItem>
          <Divider light />
          <ListItem button>
            <ListItemText primary="Spam" />
          </ListItem>
    </List>
        <nav style={{paddingRight:'25px', height: '100%', justifyContent:'center',background: 'lightgray', display:'flex', alignItems: 'center'}}>
            <ul style={{ listStyle: 'none'}}>
              <li>
                {loggedIn ? (
                <div>
                <p>Logged in User: {user}</p>
                <button onClick={handleLogout}>Log out</button>
                <Divider style={{padding: '25px'}}></Divider>

                </div>
                ) : (
                <Typography>
                  <p>Please log in to continue.</p>
                  <Link to="/">Login</Link>
                  <Divider style={{padding: '25px'}}></Divider>
                </Typography>
                )}
              </li>
              <li>
                  <Link to="/">Home</Link>
              </li>
              <li>
                  <Link to="/WhatsHappening">What's Happening</Link>
              </li>
              <li>
                  <Link to="/AboutUs">About Us</Link>
              </li>
              <li>
                  <Link to="/Contact">Contact</Link>
              </li>
            </ul>
        </nav>
        </Drawer>
      </Grid>

      <Grid item xs={7}>
      <Outlet />
      </Grid>
    </Grid>
  );



};

export default Layout;