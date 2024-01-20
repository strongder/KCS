import React, { useEffect, useState } from "react";
import ContactList from "../components/Chat/contactList/ContactList";
import ChatArea from "../components/Chat/ChatArea/ChatArea";
import "./css/LiveChat.scss";
import { Box, Grid, Paper, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/slices/UserSlice";

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
  const { data, loading} = useSelector((state) => state.users);
  const dispatch  = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
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
                <ContactList data = {data} loading = {loading}></ContactList>
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
