import React, { useState } from 'react';
import './css/ResetPassword.scss'
import { updateUser } from '../services/userService';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { fetchUserByEmail } from '../services/userService';

const ResetPassword = ({ email }) => {
    // const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);
    const history = useHistory();

    const handleSubmit = async () => {
        if (newPassword == confirmPassword) {
            const user = await fetchUserByEmail(email);
            user.password = newPassword;
            const userUpdated = await updateUser(user);
            console.log(userUpdated);
            history.push("/login")
        }else {
            alert("Xác nhận mật khẩu không trùng khớp");
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            {/* <form onSubmit={handleSubmit}> */}
            <label>New Password:</label>
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />

            <label>Confirm Password:</label>
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />

            <button type="submit" onClick={handleSubmit}>Reset Password</button>
            {/* </form> */}
        </div>
    );
};

export default ResetPassword;
