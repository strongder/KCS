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

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://localhost:8081/api/v1/auth/login`, auth, {
          headers: {
              "Content-Type": "application/json",
          },
      });
      // history.push("/")
      if (response.status === 200) {
        history.push('/')
        const token = response.data;
        const expirationTime = new Date().getTime() + 3600 * 1000; // Ví dụ: hết hạn sau 1 giờ
        localStorage.setItem('token', token);
        console.log(localStorage.getItem('token'))
        localStorage.setItem('expTime', expirationTime.toString());
      } else {
          console.log("Đăng nhập không thành công");
      }
  } catch (error) {
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
            type="text"
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
          />
        </div>
        <div className="save">
          <input type="checkbox" name="save" />
          <p>Lưu tài khoản</p>

          <a href="#">Quên mật khẩu?</a>
        </div>
        
        <button type="submit" onClick={handleLogin}>Submit</button>
      </div>
    </div>
  );
};

export default Login;
