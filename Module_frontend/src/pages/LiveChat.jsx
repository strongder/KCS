import React, { useEffect, useState } from "react";
import ContactList from "../components/Chat/contactList/ContactList";
import "./css/LiveChat.scss";
import { Box, Grid, Paper, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/slices/UserSlice";
import WindowChat from "../components/Chat/WindowChat/WindowChat";
import InfoPanel from "../components/Chat/InfoPanel/InfoPanel";
import { fetchRoomPrivate } from "../services/RoomPrivateService"
import SockJS from "sockjs-client";
import Stomp from 'stompjs';


const Item = styled(Paper)(({ theme,  selectedInfo}) => ({
  padding: "0px",
  textAlign: "center",
  borderRadius: "none",
  border:"none",
  height: "100%",
  transition: "transform 0.5s ease", /* Thêm hiệu ứng transition cho transform */
  transform: `translateX(${selectedInfo ? '-50%' : '0'})`,
}));
const LiveChat = () => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  // const [message, setMessage] = useState('');

  const [selectedChat, setSelectedChat] = useState('');
  const[selectedInfo, setSelectedInfo] = useState(false)
  const { data, loading} = useSelector((state) => state.users);
  const dispatch  = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const subscribe = async (id) => {
    const id1 = localStorage.getItem("id");
    const roomPrivate = await fetchRoomPrivate(id1, id, dispatch);
    const socket = new SockJS('http:/localhost:8081/ws');
    const client = Stomp.over(socket)
    console.log("ID1: ", id1);
    console.log("ID2: ", id);
    client.connect({},  () => {
       client.subscribe(roomPrivate + "/private", (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((preMessages) => [...preMessages, receivedMessage]);
      });
    });
    setStompClient(client)
    // onSelect(data.id)
  }

  const handleChatSelect = (userId) => {
    setSelectedChat(userId);
    console.log(userId)
    subscribe(userId);
  };

  const handleSelectedInfo =()=>{
    setSelectedInfo(!selectedInfo)
  }
  return (
    <div className="live-chat">
      <div className="live-chat-container">
        <div className="contact-list">
          <ContactList data={data} loading={loading} onSelect={handleChatSelect} />
        </div>
        <div className="window-chat">
          {selectedChat && (
            <div className="window-chat-content">
              <WindowChat userId={selectedChat} onClickInfo={handleSelectedInfo} listMessages = {messages} stompClient = {stompClient} />
            </div>
          )}
        </div>
        {selectedInfo && (

          <InfoPanel  userId={selectedChat}/>
          // <div className="info-panel">
          //   <div className="info-item">Information</div>
          // </div>
        )}
      </div>
    </div>
  );
};

export default LiveChat;
