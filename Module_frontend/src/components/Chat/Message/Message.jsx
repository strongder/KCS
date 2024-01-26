// Message.js
import React from 'react';
import './Message.scss';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { downloadFile } from '../../../services/ResourceService';
import { getFileById } from '../../../services/ResourceService';

const Message = (props) => {

  const handleImage = (fileID) => {
    downloadFile(fileID);
  }
  const { message } = props;
  const { user, currentUser } = useSelector(state => state.users)

  console.log(message);
  const who = message.idsender === currentUser.id ? 'own-message' : 'other-message'
  const avatar = message.idsender === currentUser.id ? `data:image/jpg;base64,${currentUser.avt}` : `data:image/jpg;base64,${user.avt}`;
  
  const file = async () => {
    const filename = await getFileById(message.idresources);
    return filename;
  }

  console.log(file.data);
  return (
    <div className={`message ${who}`}>
      <div className="item-avatar">
        <img src={avatar} alt="" />
      </div>
      {message.idresources !== null && <p><FontAwesomeIcon icon={faFile} onClick={() => handleImage(message.idresources)} />{message.idresources}</p>}
      {message.idresources === null && <p>{message.content}</p>}
      <small>{message.timeSend}</small>
    </div>
  );
};

export default Message;
