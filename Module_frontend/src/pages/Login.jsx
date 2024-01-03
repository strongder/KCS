import React, { useState } from "react";
import "../pages/css/Login.scss";
import logo from '../assets/images/logo.png'
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    alert("Username: " + username + " Password: " + password);
    event.preventDefault();
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
            value={username}
            onChange={handleChange}
          />
        </div>
        <div className="form-text">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="save">
          <input type="checkbox" name="save" />
          <p>Lưu tài khoản</p>

          <a href="#">Quên mật khẩu?</a>
        </div>

        <button type="submit">Submit</button>
      </div>
    </div>
  );
};

export default Login;
