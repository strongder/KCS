import React, { useState, useEffect } from "react";
import Table from "../../table/Table";
import Operation from "../../operation/Operation";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, removeUser } from "../../../redux/slices/UserSlice";
import { getAllChat, removeChat } from "../../../redux/slices/AutoChatSlice";

const customerTableHead = ["", "Nội dung", "Trạng thái", "Thao Tác"];
const renderHead = (item, index) => <th key={index}>{item}</th>;
const operationData = [
  { icon: "bx bx-message-detail", name: "Chi tiết tin nhắn" },
  { icon: "bx bx-edit", name: "Sửa tin nhắn" },
  { icon: "bx bx-trash", name: "Xóa tin nhắn" },
];
const ChatContent = (props) => {
  const history = useHistory();
  const handleOperationClick = (item, autoChat) => {
    if (item.name === "Chi tiết tin nhắn") {
      history.push(`/admin/auto-chat/${autoChat.id}`);
    } else if (item.name === "Sửa tin nhắn") {
      history.push(`/admin/auto-chat/update/${autoChat.id}`);
    } else if (item.name === "Xóa tin nhắn") {
      dispatch(removeChat(autoChat.id));
    }
  };
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td
        style={{
          maxWidth: "230px" /* Đặt chiều rộng tối đa của ô */,
          overflow: "hidden" /* Ẩn nội dung vượt quá chiều rộng */,
          textOverflow:
            "ellipsis" /* Hiển thị dấu chấm elipsis khi nội dung quá dài */,
        }}
      >
        {item.content}
      </td>
      <td style={{ width: "140px", margin: "auto" }}>
        <div style={{ width: "75%", display: "flex" }} className="isdelete">
          {!item.isDelete ? (
            <i
              style={{ margin: "auto", color: "blue", fontSize: "25px" }}
              className="bx bx-check-circle"
            ></i>
          ) : (
            <i
              style={{ margin: "auto", color: "red", fontSize: "25px" }}
              className="bx bx-x-circle"
            ></i>
          )}
        </div>
      </td>
      <td style={{ width: "96px", margin: "auto" }}>
        <Operation
          operation={operationData}
          userData={item}
          onOperationClick={handleOperationClick}
        ></Operation>
      </td>
    </tr>
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllChat());
  }, [dispatch]);

  return (
    <>
      {!props.loading && (
        <Table
          limit= '5'
          headData={customerTableHead}
          renderHead={(item, index) => renderHead(item, index)}
          bodyData={props.data}
          renderBody={(item, index) => renderBody(item, index)}
        />
      )}
    </>
  );
};

export default ChatContent;
