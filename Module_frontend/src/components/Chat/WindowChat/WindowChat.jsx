import React, { useEffect, useRef, useState } from "react";
import "./WindowChat.scss";
import avatar from "../../../assets/images/tuat.png";
import ExpandableInput from "../../ExpandableInput/ExpandableInput";
import MessageInput from "../messageInput/MessageInput";
import Message from "../Message/Message";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../../redux/slices/UserSlice";
const WindowChat = (props) => {
  const { userId, onClickInfo } = props;
  const { user } = useSelector(state => state.users)
  const dispatch = useDispatch()
  const [selectSearch, SetSelectSearch] = useState(false);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'User 1', content: 'Hello!', time: '10:00 AM' },
    { id: 2, sender: 'User 2', content: 'Hi there!', time: '10:05 AM' },
    // Add more messages as needed
  ]);
  const handleClickSearch = () => {
    SetSelectSearch(!selectSearch);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    dispatch(fetchUserById(userId))
  }, [userId, dispatch])


  const handleSendMessage = (content) => {
    const newMessage = {
      id: messages.length + 1,
      sender: 'User 1',
      content,
      time: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]);
  };
  return (
    <div className="chat-area">
      {user && (<div className="chat-area-nav">
        <img src={user.avt} alt="" />
        <p className="name"> {user.name}</p>
        <div className="logo">
          <p className="search" onClick={handleClickSearch}>
            <i class="bx bx-search"></i>
          </p>
          <p className="info" onClick={onClickInfo}>
            <i class="bx bx-info-circle"></i>
          </p>
        </div>
      </div>)}
      {selectSearch && (
        <div className="chat-area-search">
          <div className="search-left">
            <i className="bx bx-search"></i>
            <input type="text" placeholder="Search here..." />
          </div>
          <div className="search-right">
            <i class="bx bx-up-arrow-circle"></i>
            <i class="bx bx-up-arrow-circle bx-flip-vertical"></i>
          </div>
          <button onClick={handleClickSearch}>
            <b>Close</b>
          </button>
        </div>
      )}

      <div className="chat-area-content">
        <div className="message-list">
          {messages.map((message) => (
            <Message
            key={message.id}
            message={message}
          />
          ))}
           <div ref={messagesEndRef} />
        </div>
      </div>
      
        <MessageInput onSendMessage={handleSendMessage}></MessageInput>
      
    </div>
  );
};

export default WindowChat;
