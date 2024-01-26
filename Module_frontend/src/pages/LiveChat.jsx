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
import axiosInstance from "../api";

const Item = styled(Paper)(({ theme, selectedInfo }) => ({
  padding: "0px",
  textAlign: "center",
  borderRadius: "none",
  border: "none",
  height: "100%",
  transition: "transform 0.5s ease",
  transform: `translateX(${selectedInfo ? '-50%' : '0'})`,
}));

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [selectedChat, setSelectedChat] = useState('');
  const [selectedInfo, setSelectedInfo] = useState(false);
  const { data, loading } = useSelector((state) => state.users);
  const [roomId, setRoomId] = useState('');
  const stompClientRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };

    return unsubscribe;
  }, [stompClient]);

  const fetchRoom = async (id1, id2) => {
    const roomId = await getRoomByUser(id1, id2);
    setRoomId(roomId);
    return roomId;
  };

  const getChatbyRoom = async (roomId) => {
    const response = await axiosInstance.get(`http://localhost:8081/api/v1/message/${roomId}`);
    setMessages(response.data);
  };

  const subscribe = async (room) => {
    const socket = new SockJS('http://localhost:8081/ws');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe(`/topic/room/${room}`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, receivedMessage]);
      });
    });
    setStompClient(client);

    return () => {
      client.disconnect();
    };
  };

  const handleChatSelect = async (userId) => {
    const userId1 = localStorage.getItem('id');
    const room = await fetchRoom(userId1, userId);
    await getChatbyRoom(room);
    const unsubscribe = subscribe(room);
    setSelectedChat(userId);
    console.log(userId);

    return () => {
      unsubscribe();
    };
  };

  const handleSelectedInfo = () => {
    setSelectedInfo(!selectedInfo);
  };

  return (
    <div className="live-chat">
      <div className="live-chat-container">
        <div className="contact-list">
          <ContactList data={data} loading={loading} onSelect={handleChatSelect} />
        </div>
        <div className="window-chat">
          {selectedChat && (
            <div className="window-chat-content">
              <WindowChat
                userId={selectedChat}
                stompClient={stompClient}
                messages={messages}
                roomId={roomId}
                onClickInfo={handleSelectedInfo}
              />
            </div>
          )}
        </div>
        {selectedInfo && <InfoPanel userId={selectedChat} />}
      </div>
    </div>
  );
};

export default LiveChat;
