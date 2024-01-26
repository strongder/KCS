import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/theme.css";
import "./assets/css/index.css";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";
import NotFound from './pages/NotFound';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
// import ResetPassword from './pages/ResetPassword';
import AcceptEmail from './pages/AcceptEmail';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const checkLogin = useCallback(() => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('expTime');

    if (token && expirationTime) {
      const currentTime = new Date().getTime();
      if (currentTime < parseInt(expirationTime, 10)) {
        setIsLoggedIn(!isLoggedIn);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('expTime');
        localStorage.removeItem('id')
        setIsLoggedIn(!isLoggedIn);
      }

    }
  }, [isLoggedIn]);

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/forgot-password" component={AcceptEmail} />
        {isLoggedIn ? (
          <Route path="/" component={Layout} />
        ) : (
          <Login/>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;