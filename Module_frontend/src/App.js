import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/theme.css";
import "./assets/css/index.css";
import Router from './Router';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('expTime');
    
    if (token && expirationTime) {
      const currentTime = new Date().getTime();
      if (currentTime < parseInt(expirationTime, 10)) {
        setIsLoggedIn(true);
      } else {
        // Xóa token và thời gian hết hạn nếu token đã hết hạn
        localStorage.removeItem('token');
        localStorage.removeItem('expTime');
        localStorage.removeItem('id')
        setIsLoggedIn(false);
      }
    }
  }, []);

  return (
   <Router isLoggedIn = {isLoggedIn}/>
  );
}

export default App;
