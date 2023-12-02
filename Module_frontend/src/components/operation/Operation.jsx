import React, { useState } from "react";
import "./Operation.scss";
const Operation = (props) => {
  const { operation, onOperationClick, userData } = props;
  const [open, setOpen] = useState(false);
  const handleOpenOperation = () => {
    setOpen(!open);
  };
  const handleOperationClick = (e) => {
    // Gọi hàm xử lý sự kiện từ thành phần cha và truyền thông tin người dùng và mục operation
    console.log("ckeck item: ", e.name)
    onOperationClick(e, userData);
    // Đóng danh sách khi một mục trong danh sách được chọn
    setOpen(false);
  };
  return (
    <div className="operation">
      <div className="operation-open" onClick={handleOpenOperation}>
        <i class="bx bx-dots-vertical"></i>
      </div>
      {open && (
        <div className="operation-list-item">
          {operation.map((item, index) => {
            return (
              <div  onClick={()=>handleOperationClick(item)}  key={index} className="operation-item">
                <i class={item.icon}></i>
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Operation;
