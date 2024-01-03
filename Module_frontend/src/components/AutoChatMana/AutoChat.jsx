import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChat } from "../../redux/slices/AutoChatSlice";
import NavAutoChat from "./AddAutoChat/NavAutoChat";
import Sort from "../sort/Sort";
import ChatContent from "./ChatContent/ChatContent";

const sortByOptions = [
  { name: "", value: "Lọc tin nhắn" },
  { name: "date", value: "Xếp theo ngày thêm" },
  { name: "delete", value: "Tin nhán đã xóa" },
  { name: "Notdelete", value: "Tin nhắn còn sử dụng" },
];
const AutoChat = () => {
  const dispatch = useDispatch();
  const {autoChatList,  autoChat,  loading,  error, searchData} = useSelector(state => state.autoChat)
  const [sort, setSort] = useState("");
  const handleChange = (e) => {
    setSort(e.target.value);
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className="auto-chat"
    >
      <h2 style={{ margin: "35px auto" }} className="page-header">
        Quản lý tin nhắn tự động
      </h2>
      <div className="row">
        <div className="col-10" style={{ margin: "auto" }}>
          <div className="card">
            <div className="card-header">
              <NavAutoChat></NavAutoChat>
            </div>
            <div style={{ margin: "auto", padding: "0 62px" }}>
              <Sort
                handleChange={handleChange}
                sort={sort}
                sortBy={sortByOptions}
              ></Sort>
            </div>
            <div style={{ margin: "0 40px" }} className="card__body">
              <ChatContent data ={autoChatList} loading = {loading}></ChatContent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoChat;
