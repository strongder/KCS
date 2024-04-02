import React, { useState } from "react";
import "../pages/css/Login.scss";
import logo from '../assets/images/logo.png'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";


const Login = () => {
  const history  = useHistory('');
  const [auth, setAuth] = useState({
    username: '',
    password: ''
  })
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAuth({...auth, [name] : value})
  };
  const validateForm = () => {
    const { username, password } = auth;
  
    if (!username || !password) {
      alert("Vui lòng điền đầy đủ thông tin");
      return false;
    }
    return true;
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };
  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8081/api/v1/auth`, auth, {
          headers: {
              "Content-Type": "application/json",
          },
      });
      if (response.status === 200) {
        history.push('/')
        const token = response.data.token;
        const id = response.data.id;
        const expirationTime = new Date().getTime() + 3600 * 1000;
        localStorage.setItem('token', token);
        localStorage.setItem('id', id)
        console.log(localStorage.getItem('token'))
        localStorage.setItem('expTime', expirationTime.toString());
        alert("Đăng nhập thành công!")
      } else {
          console.log("Đăng nhập không thành công");
      }
  } catch (error) {
      alert("Tài khoản hoặc mật khẩu không đúng!")
      console.log(error);
  }
};

  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="form-login">
        <h2>Đăng nhập</h2>
        <div className="form-text">
          <label>Email:</label>
          <input
            type="email"
            name="username"
            value={auth.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-text">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={auth.password}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="save">

          <a href="/forgot-password">Quên mật khẩu?</a>
        </div>
        
        <button type="submit" onClick={handleLogin} >Đăng nhập</button>
      </div>
    </div>
  );
};

export default Login;
