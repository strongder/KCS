// Message.js
import React from 'react';
import './Message.scss';
import { useSelector } from 'react-redux';

const Message = ({ message }) => {

  const {user, currentUser, loadin} = useSelector(state => state.users)
  const who  = message.sender ==="User 1"?'own-message':'other-message'

  console.log(message)
  const avatar = message.sender ==="User 1"? currentUser.avt : user.avt;
  return (
    <div className={`message ${who}`}>
      <div className="avavtar">
        <img src={avatar} />
      </div>
      <span>{message.sender}</span>
      <p>{message.content}</p>
      <small>{message.time}</small>
    </div>
  );
};

export default Message;
