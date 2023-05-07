// src/App.js
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WhatsHappening from "./pages/WhatsHappening";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="WhatsHappening" element={<WhatsHappening />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>    
    </div>
    </ThemeProvider>);
}

export default App;