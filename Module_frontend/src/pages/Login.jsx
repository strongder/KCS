import React, { useState } from 'react';
import '../pages/css/Login.scss'
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = (event) => {
        alert('Username: ' + username + ' Password: ' + password);
        event.preventDefault();
    };

    return (
        <div className='login'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={username} onChange={handleChange} />
                </label>
           <label>
                    Password
                    <input type="password" name="password" value={password} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Login;