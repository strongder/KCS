import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/theme.css";
import "./assets/css/index.css";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";
import NotFound from './pages/NotFound';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect( () => {
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
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} /> 
        <Route path="/not-found" component={NotFound} />
        <Route path="/" render={(props) => (
          console.log(isLoggedIn)&&!isLoggedIn ?<Redirect to='/login' />: <Layout {...props}/> 
          )} />
        <Redirect to="/not-found" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
