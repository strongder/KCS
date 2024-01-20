import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import "./ViewAutoChat.scss";
import { fetchUserById } from "../../../redux/slices/UserSlice";
import { Link } from "react-router-dom";
import { getChatById } from "../../../redux/slices/AutoChatSlice";

const ViewAutoChat = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { autoChat } = useSelector((state) => state.autoChat);
  useEffect(() => {
    if (id) {
      dispatch(getChatById(id));
    }
  }, [id, dispatch]);

  const bodyData = [
    {
      title: "Ngưởi tạo:  ",
      value: autoChat ? autoChat.createBy : "",
    },
    {
      title: "Người sửa",
      value: autoChat ? autoChat.updateBy : "",
    },

    {
      title: "Ngày tạo:",
      value: autoChat ? autoChat.createDate : "",
    },
    {
      title: "Ngày sửa:",
      value: autoChat ? autoChat.updateDate : "",
    },
  ];

  return (
    <div className="view-chat">
      <h2>Tin nhắn tự động</h2>
      <div className="auto-chat-container">
        <div className="list-field">
          <div className="field">
            <label style={{ width: " 25%" }}>
              <i className="bx bxs-star"></i>
              Nội dung:
            </label>
            <textarea value={autoChat.content} />
          </div>
          {bodyData.map((item, index) => (
            <div key={index} className="field">
              <label>
                <i className="bx bxs-star"></i>
                {item.title}
              </label>
              <input type="text" value={item.value || ""} readOnly />
            </div>
          ))}
          <div className="field" style={{ margin: "20px 0" }}>
            <i className="bx bxs-star"></i>
            <label>Trạng thái: </label>
            <b> {autoChat.isDelete === true ? "Đã xóa" : "Còn sử dụng"}</b>
          </div>
        </div>
      </div>
      <div className="cancel">
        <Link to="/admin/auto-chat">
          <button>Thoát</button>
        </Link>
      </div>
    </div>
  );
};

export default ViewAutoChat;
