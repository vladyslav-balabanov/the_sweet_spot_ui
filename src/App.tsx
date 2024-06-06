import React, { useContext, useEffect } from 'react';
import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import { Context } from '.';
import { checkToken, UserClaims } from './http/authApi';
import { jwtDecode } from 'jwt-decode';
import mapJwtClaims from './utils/mapJwtClaims';

function App() {
  const contextValue = useContext(Context);
  const user = contextValue!.user;

  useEffect(() => {
    checkToken().then(() => {
      const token = localStorage.getItem('token');
      if (token !== null) {
        const decodedToken = jwtDecode(token) as UserClaims;
        user.setUser(mapJwtClaims(decodedToken));
        user.setIsAuth(true)
      }
    }).catch(() => console.error("Error"))
  }, [user])

  return (
      //todo: add <AppRouter />
      <BrowserRouter>
      </BrowserRouter>
  );
}

export default App;
