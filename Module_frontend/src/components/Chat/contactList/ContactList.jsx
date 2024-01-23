import React from "react";
import "./ContactList.scss";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import avatar from "../../../assets/images/tuat.png";
import { useDispatch } from "react-redux";
import { fetchRoomPrivate } from "../../../services/RoomPrivateService";
import { useState } from "react";

const ContactList = (props) => {
  const { data, loading, onSelect } = props
  const [value, setValue] = React.useState("1");
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const subcrible = (data) => {
    const id1 = localStorage.getItem("id");
    const roomPrivate = fetchRoomPrivate(id1, data.id);
    const socket = new SockJS('http:/localhost:8080/ws');
    const client = Stomp.over(socket)
    // console.log("test")
    client.connect({}, () => {
      client.subscribe(roomPrivate.id + "/private", (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((preMessages) => [...preMessages, receivedMessage]);
      });
    });
    setStompClient(client)
    onSelect(data.id)
  }

  return (
    <>

      {!loading && (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                sx={{ width: "100%" }}
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab sx={{ width: "50%" }} label="Student" value="1" />
                <Tab sx={{ width: "50%" }} label="Teacher" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="nav-list">
                <div className="nav-search">
                  <input type="text" placeholder="Search..." />
                  <i class="bx bx-search-alt"></i>
                </div>
                <div className="content">
                  <div className="list-item">
                    
                    
                    
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="nav-list">
                <div className="nav-search">
                  <input type="text" placeholder="Search..." />
                  <i class="bx bx-search-alt"></i>
                </div>
                <div className="content">
                  <div className="list-item">

                    {data.map((item, index) =>{
                      return (
                      <div className="item" key ={index} onClick={() => subcrible(item)} >

                      <div className="item-avatar">
                        <img src={item.avt} alt="" />
                      </div>
                      <div className="item-content">
                        <p className="name">{item.name}</p>
                        <p className="message"> tin nhan gan nhat</p>
                      </div>
                      <p>vai giay truoc</p>
                    </div>)
                    })}
                    
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </Box>)}</>
  );
};

export default ContactList;
