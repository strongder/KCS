import React from "react";
import "./ChatArea.scss";
import avatar from "../../assets/images/tuat.png";
const ChatArea = (props) => {
  const {handleClickInfo} = props;
  

  return (
    <div className="chat-area">
      <div className="chat-area-nav">
        <img src={avatar} alt="" />
        <p className="name"> thah</p>
        <div className="logo">
          <p className="search">
            <i class="bx bx-search"></i>
          </p>
          <p className="info" onClick={()=>handleClickInfo()}>
            <i class="bx bx-info-circle"></i>
          </p>
        </div>
      </div>
      <div className="chat-area-content"></div>
      <div className="chat-area-footer"></div>
    </div>
  );
};

export default ChatArea;
