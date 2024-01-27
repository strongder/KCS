// Message.js
import React from 'react';
import './Message.scss';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { downloadFile } from '../../../services/ResourceService';
import { getFileById } from '../../../services/ResourceService';
import { useState } from 'react';

const Message = (props) => {

  const handleImage = (fileID) => {
    downloadFile(fileID);
  }
  const { message } = props;
  const { user, currentUser } = useSelector(state => state.users)
  const who = message.idsender === currentUser.id ? 'own-message' : 'other-message'
  const avatar = message.idsender === currentUser.id ? `data:image/jpg;base64,${currentUser.avt}` : `data:image/jpg;base64,${user.avt}`;



  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`message ${who}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="item-avatar">
        <img src={avatar} alt="" />
      </div>
      <div className='content'>
        {message.idresources !== null && <div className='file'>
          <p style ={{fontSize:"60px", paddingBottom:"15px"}}><FontAwesomeIcon icon={faFile} onClick={() => handleImage(message.idresources)} /></p>
        </div>}
        {message.content ===''?null:<div className="message">
          <p>{message.content}</p>
        </div>}
      </div>
      <div className='time'></div>
      {isHovered && (<small>{new Date(message.timeSend).toLocaleString()}</small>)}
    </div>
  );
};

export default Message;
