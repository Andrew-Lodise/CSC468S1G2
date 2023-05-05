// src/App.js
import React from 'react';
import LoginPage from './LoginPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  spacing: 4,
  palette: {
    mode: 'light',
  },
});
darkTheme.spacing(10); 

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <div className="App">
      <LoginPage />
    </div>
    </ThemeProvider>);
}

export default App;