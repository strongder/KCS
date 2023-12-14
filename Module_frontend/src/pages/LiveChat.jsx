import React, { useEffect, useState } from "react";
import ContactList from "../components/contactList/ContactList";
import ChatArea from "../components/ChatArea/ChatArea";
import "./css/LiveChat.scss";
import { Box, Grid, Paper, styled } from "@mui/material";

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
  const [selectedInfo, setSelectedInfo] = useState(false);
  const handleClickInfo = () => {
    setSelectedInfo(!selectedInfo);
  };
  return (
    <div className="live-chat">
      <Box sx={{ flexGrow: 1}}>
        <Grid container >
          <Grid  item xs={3}>
            <Item>
              <div>
                <ContactList></ContactList>
              </div>
            </Item>
          </Grid>
          <Grid item xs>
            <Item>
              <ChatArea handleClickInfo={handleClickInfo} />
            </Item>
          </Grid>
          {selectedInfo && (
            <Grid item xs={3}>
              <Item 
              className="info-item">infomation</Item>
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default LiveChat;
