import React, { useState } from 'react';
import './css/AcceptEmail.scss'; // Import file CSS cho thiết kế
import Logo from '../assets/images/logo.png'
import { fetchUserByEmail } from '../services/userService';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom';
import { createVerificationCode } from '../services/EmailSenderService';
import NotificationEmail from './NotificationEmail';

const AcceptEmail = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // var user;
  const handleEmail = async (email) => {
    // console.log(email)
    const user = await fetchUserByEmail(email);
    // console.log(user.email);
    if(user === null) {
      alert('Emai không tồn tại')
      setResetSuccess(false);
    } else {
      const token = await createVerificationCode(email);
      // console
      setCode(token);
      setResetSuccess(true);
    }
  }

  if (resetSuccess) {
    return <NotificationEmail email = {email} code={code}/>
  }

  return (
    <div className='"forgot-password'>
      <div className="logo-image">
        <img src = {Logo} alt = ""></img>
      </div>
      <h2 className='label'>Reset your password</h2>
      <div className="reset-password-container">
        {/* <form onSubmit={(e) => handleEmail(e, email)}> */}
          {/* <p className='label-p'>Enter your user account's verified email address and we will send you a password reset verification code.</p> */}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required  className='input-email'/>
          <button onClick={() => handleEmail(email)}>Reset Password</button>
        {/* </form> */}
      </div>
    </div>
  );
};

export default AcceptEmail;
