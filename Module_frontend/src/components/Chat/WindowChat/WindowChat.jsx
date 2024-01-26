import React, { useEffect, useRef, useState } from "react";
import "./WindowChat.scss";
import MessageInput from "../messageInput/MessageInput";
import Message from "../Message/Message";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../../redux/slices/UserSlice";
import { addFile } from "../../../services/ResourceService";

const WindowChat = (props) => {

  const { userId, onClickInfo, messages, roomId, stompClient } = props;
  const { user } = useSelector(state => state.users)
  const dispatch = useDispatch()
  const [selectSearch, SetSelectSearch] = useState(false);
  const messagesEndRef = useRef(null);
  console.log("-----------", roomId)

  const sendMessage = async (message, selectFile) => {
    var file
    if(selectFile !== null) {
      file = await addFile (localStorage.getItem('id'), selectFile)
      console.log(selectFile);
    }
    if (message.trim() || selectFile !== null) {
      const chatMessage = {
        content: (message === null) ? "" : message,
        idsender: localStorage.getItem('id'),
        idresources: (selectFile === null) ? null : file.id,
        roomPrivateID: roomId,
        timeSend: new Date(),
      }

      stompClient.send(`/app/chat/room/${roomId}`, {}, JSON.stringify(chatMessage));
    }
  }

  console.log("check room" ,roomId)

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

  return (
    <div className="chat-area">
      {user && (<div className="chat-area-nav">
        <img src={user.avt} alt="" />
        <p className="name"> {user.name}</p>
        <div className="logo">
          <p className="search" onClick={handleClickSearch}>
            <i className="bx bx-search"></i>
          </p>
          <p className="info" onClick={onClickInfo}>
            <i className="bx bx-info-circle"></i>
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
            <i className="bx bx-up-arrow-circle"></i>
            <i className="bx bx-up-arrow-circle bx-flip-vertical"></i>
          </div>
          <button onClick={handleClickSearch}>
            <b>Close</b>
          </button>
        </div>
      )}

      <div className="chat-area-content">
        <div className="message-list">

          {messages.map((message, index) => (
            <Message
              key={index}
              message={message}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <MessageInput onSendMessage={sendMessage}></MessageInput>
    </div>
  );

}
export default WindowChat;