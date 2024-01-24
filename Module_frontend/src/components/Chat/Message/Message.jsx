// Message.js
import React from 'react';
import './Message.scss';
import { useSelector } from 'react-redux';

const Message = (props) => {
  const {message} = props;
  const {user, currentUser} = useSelector(state => state.users)
  
  const who  = message.idsender === currentUser.id?'own-message':'other-message'
  const avatar = message.idsender ===currentUser.id ? currentUser.avt : user.avt;
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
