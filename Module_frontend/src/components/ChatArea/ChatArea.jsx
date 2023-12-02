import React, { useState } from "react";
import "./ChatArea.scss";
import avatar from "../../assets/images/tuat.png";
const ChatArea = (props) => {
  const { handleClickInfo } = props;
  const [selectSearch, SetSelectSearch] = useState(true);

  const handleClickSearch = () => {
    SetSelectSearch(!selectSearch);
  };
  return (
    <div className="chat-area">
      <div className="chat-area-nav">
        <img src={avatar} alt="" />
        <p className="name"> thah</p>
        <div className="logo">
          <p className="search" onClick={handleClickSearch}>
            <i class="bx bx-search"></i>
          </p>
          <p className="info" onClick={() => handleClickInfo()}>
            <i class="bx bx-info-circle"></i>
          </p>
        </div>
      </div>
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
          <button onClick={handleClickSearch}><b>Close</b></button>
        </div>
      )}

      <div className="chat-area-content"></div>
      <div className="chat-area-footer">
        <div className="chat-file">
          <i class="bx bx-link"></i>
        </div>
        <div className="chat-image">
          <i class="bx bx-images"></i>
        </div>
        <div className="chat-message">
          <input type="text" placeholder="Aa" />
          <p>
            <i class="bx bx-smile"></i>
          </p>
        </div>
        <div className="chat-send">
          <i class="bx bx-send"></i>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
