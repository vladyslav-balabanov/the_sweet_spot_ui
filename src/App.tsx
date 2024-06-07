import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Context } from '.';
import { checkToken, UserClaims } from './http/authApi';
import { jwtDecode } from 'jwt-decode';
import mapJwtClaims from './utils/mapJwtClaims';
import {AppRouter} from "./components/AppRouter/AppRouter";
import './styles/App.css';

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
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
  );
}

export default App;
