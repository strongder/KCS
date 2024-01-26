// Message.js
import React from 'react';
import './Message.scss';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { downloadFile } from '../../../services/ResourceService';
// import { getFileById } from '../../../services/ResourceService';
import { useState } from 'react';

const Message = (props) => {

  const handleImage = (fileID) => {
    downloadFile(fileID);
  }
  const { message } = props;
  const { user, currentUser } = useSelector(state => state.users)

  console.log(message);
  const who = message.idsender === currentUser.id ? 'own-message' : 'other-message'
  const avatar = message.idsender === currentUser.id ? `data:image/jpg;base64,${currentUser.avt}` : `data:image/jpg;base64,${user.avt}`;

  // const file = async () => {
  //   if(message.idresources !== null) {
  //     return getFileById(message.idresources);
  //   }

  //   return null; 
  // }

  // const filename = file();

  const [isHovered, setIsHovered] = useState(false);

  const hoverEnter = () => {
    setIsHovered(true);
    console.log("enter");
  }

  const hoverLeave = () => {
    setIsHovered(false);
    console.log("leave");
  }

  return (
    <div className={`message ${who}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="item-avatar">
        <img src={avatar} alt="" />
      </div>
      <div>
        {message.idresources !== null && <p><FontAwesomeIcon icon={faFile} onClick={() => handleImage(message.idresources)} />{message.idresources}</p>}
        {message.idresources === null && <p>{message.content}</p>}
      </div>
      {isHovered && (<small>{new Date(message.timeSend).toLocaleString()}</small>)}
    </div>
  );
};

export default Message;
