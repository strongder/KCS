import React, { useEffect, useRef, useState } from "react";
import ContactList from "../components/Chat/contactList/ContactList";
import "./css/LiveChat.scss";
import { Box, Grid, Paper, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/slices/UserSlice";
import WindowChat from "../components/Chat/WindowChat/WindowChat";
import InfoPanel from "../components/Chat/InfoPanel/InfoPanel";
import Stomp from "stompjs";
import SockJS from 'sockjs-client';
import { getRoomByUser } from "../services/RoomPrivateService";
// import { getRoomByUser } from "../redux/slices/RoomPrivateSlice";



const Item = styled(Paper)(({ theme, selectedInfo }) => ({
  padding: "0px",
  textAlign: "center",
  borderRadius: "none",
  border: "none",
  height: "100%",
  transition: "transform 0.5s ease", /* Thêm hiệu ứng transition cho transform */
  transform: `translateX(${selectedInfo ? '-50%' : '0'})`,
}));
const LiveChat = () => {

  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [selectedChat, setSelectedChat] = useState('');
  const [selectedInfo, setSelectedInfo] = useState(false)
  const { data, loading } = useSelector((state) => state.users);
  const [roomId, setRoomId] = useState('')
  const stompClientRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);



  const subscribe = (room) => {
    const socket = new SockJS('http://localhost:8081/ws');
    const client = Stomp.over(socket);
    // if (stompClientRef.current) {
    //   stompClientRef.current.disconnect();
    // }
    client.connect({}, () => {
      client.subscribe(`/topic/room/${room}`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, receivedMessage]);
      });
    });
    setStompClient(client);

    // stompClientRef.current = client; 
  };

  const handleChatSelect = async (userId) => {
    const userId1 = localStorage.getItem('id');
    const room = await getRoomByUser(userId1, userId);
    setRoomId(room)
    subscribe(room);
    setSelectedChat(userId);
    console.log(userId)
  };

  const handleSelectedInfo = () => {
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
              <WindowChat userId={selectedChat}
                stompClient={stompClient}
                messages={messages}
                roomId={roomId}
                onClickInfo={handleSelectedInfo} />
            </div>
          )}
        </div>
        {selectedInfo && (

          <InfoPanel userId={selectedChat} />
          // <div className="info-panel">
          //   <div className="info-item">Information</div>
          // </div>
        )}
      </div>
    </div>
  );
};

export default LiveChat;