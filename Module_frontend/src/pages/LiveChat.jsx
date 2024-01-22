import React, { useEffect, useState } from "react";
import ContactList from "../components/Chat/contactList/ContactList";
import "./css/LiveChat.scss";
import { Box, Grid, Paper, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/slices/UserSlice";
import WindowChat from "../components/Chat/WindowChat/WindowChat";
import InfoPanel from "../components/Chat/InfoPanel/InfoPanel";

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
  const [selectedChat, setSelectedChat] = useState('');
  const[selectedInfo, setSelectedInfo] = useState(false)
  const { data, loading} = useSelector((state) => state.users);
  const dispatch  = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const handleChatSelect = (userId) => {
    setSelectedChat(userId);
    console.log(userId)
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
              <WindowChat userId={selectedChat} onClickInfo={handleSelectedInfo} />
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
