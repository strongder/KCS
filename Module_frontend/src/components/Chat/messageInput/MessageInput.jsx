// MessageInput.js

import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faPaperPlane, faFile, faImage } from '@fortawesome/free-solid-svg-icons';
import './MessageInput.scss';
import EmojiPicker from '../EmojiPicker/EmojiPicker';

const  MessageInput = (props) => {
  const { onSendMessage } = props;
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputFileRef = useRef(null);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if ((message.trim() !== '' || selectedFile) && onSendMessage) {
      onSendMessage(message, selectedFile);
      setShowEmojiPicker(false)
      setMessage('');
      setSelectedFile(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageUrl = URL.createObjectURL(file);
        setSelectedFile({ file, imageUrl });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleEmojiClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji);
  };

  const clearFileInput = () => {
    inputFileRef.current.value = '';
    setSelectedFile(null);
  };

  return (
    <div className="message-input">
      <div className="file-input">
        <input type="file" id="file" onChange={handleFileChange} ref={inputFileRef} />
        <label htmlFor="file">
          <FontAwesomeIcon icon={faFile} />
        </label>
      </div>
      <div className="image-input">
        <input type="file" id="image" accept="image/*" onChange={handleFileChange} ref={inputFileRef} />
        <label htmlFor="image">
          <FontAwesomeIcon icon={faImage} />
        </label>
      </div>

      <div className="input">
        <div className="emoji-icon" onClick={handleEmojiClick}>
          <FontAwesomeIcon icon={faSmile} />
        </div>
        <div className="input-chat">

          {selectedFile && (
            <div className="preview-file">
              {selectedFile.file.type.startsWith('image/') ? (
                <img src={selectedFile.imageUrl} alt="Selected" onClick={clearFileInput} />
              ) : (<>

                <FontAwesomeIcon style={{ fontSize: "20px", margin: "0 5px" }} icon={faFile} /> 
                <span style={{
                  fonSize: "13px",
                  marginTop: "6px"
                }}>{selectedFile.file.name}</span>
              </>
              )}
            </div>
          )}
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        {showEmojiPicker && <EmojiPicker onSelect={handleEmojiSelect} />}
      </div>

      <div className="send-icon" onClick={handleSendMessage}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </div>
    </div>
  );
};

export default MessageInput;
