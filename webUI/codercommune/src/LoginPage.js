// src/LoginPage.js
import LoginComponent from './LoginComponent';
import RegisterPage from './RegisterComponent';
import { useEffect } from 'react';



function LoginPage() {

  useEffect(() => {
    document.title = 'CoderCommune - Login/Register';
  }, []);

  return (
    <>
    <div>
      <LoginComponent />
      <RegisterPage />
    </div>
    </>
  );
}

export default LoginPage;