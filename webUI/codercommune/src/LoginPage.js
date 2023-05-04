// src/LoginPage.js
import LoginComponent from './LoginComponent';
import RegisterPage from './RegisterComponent';
import { Box, Grid } from '@mui/material';
import Logo from './assets/logo/LogoFinalAsset 1@2x.png'
import { useEffect } from 'react';





function LoginPage() {

  useEffect(() => {
    document.title = 'CoderCommune - Login/Register';
  }, []);

  return (
    <Box display="flex" justifyContent="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
      <img style={{ margin: '3vw', marginBottom: '1vw', maxWidth: '80%', alignContent: 'center' }} src={Logo} alt="CoderCommune Logo"/>

    <div style={{ marginLeft: '8vw' }}>
      <headElements />
      <LoginComponent />
    
      <RegisterPage />
    </div>
    </Grid>
    </Box>
  );
}

export default LoginPage;