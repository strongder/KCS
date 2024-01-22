import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAllChat, getChatById, updateChat } from "../../../redux/slices/AutoChatSlice";

const EditAutoChat = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { autoChat } = useSelector((state) => state.autoChat);
  let [editChat, setEditChat] = useState({
    content: "",
    isDelete: "",
  });

  useEffect(() => {
    dispatch(getChatById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (autoChat) {
      setEditChat({
        content: autoChat.content,
        isDelete: autoChat.isDelete ? "delete" : "active",
      });
    }
  }, [autoChat]);

  const handleChange = (e) => {
    setEditChat((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = () => {
    let newChat = {...autoChat, ...editChat}
    const isDelete = newChat.isDelete === 'delete' ? true: false;
    newChat = {...newChat, isDelete}
    console.log (">>>>>>>", newChat)
    dispatch(updateChat(newChat));
    // dispatch(getAllChat());
    //history.push("/admin/auto-chat")
    
  };

  return (
    <div className="view-chat">
      <h2>Chỉnh sửa tin nhắn tự động</h2>
      <div className="auto-chat-container">
        <div className="list-field">
          <div className="field">
            <label style={{ width: " 25%" }}>
              <i className="bx bxs-star"></i>
              Nội dung:
            </label>
            <textarea
              value={editChat.content}
              name="content"
              onChange={handleChange}
            />
          </div>
          <div className="field" style={{ margin: "20px 0" }}>
            <i className="bx bxs-star"></i>
            <label>Trạng thái: </label>
            <select name="isDelete" onChange={handleChange} value={editChat.isDelete}>
              <option value="delete">Đã xóa</option>
              <option value="active">Hoạt động</option>
            </select>
          </div>
        </div>
      </div>
      <div className="button">
        <Link to="/admin/auto-chat">
          <button>Thoát</button>
        </Link>
        <button onClick={handleUpdate}>Xác nhận</button>
      </div>
    </div>
  );
};

export default EditAutoChat;
