import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addChat, getAllChat } from "../../../redux/slices/AutoChatSlice";
import ExpandableInput from "../../ExpandableInput/ExpandableInput";
import "../AddAutoChat/AutoChat.scss";

const AddChat = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnSubscribe = () => {
    handleSubscribe();
    handleClose();
  };

  const [formData, setFormData] = useState({
    content: "",
  });

  const handleInputChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      content: value,
    }));
  };

  const handleSubscribe = async () => {
    const chat = formData;
    await dispatch(addChat(chat));
    await dispatch(getAllChat());
  };

  const bodyData = [
    {
      title: "Nội dung:",
      value: (
        <ExpandableInput
          placeholder="Nhập nội dung..."
          maxRows={5}
          onChange={handleInputChange}
        />
      ),
    },
  ];

  return (
    <div className="addChat">

      <Button variant="outlined" onClick={handleClickOpen}>
        Thêm tin nhắn tự động
      </Button>
      <Dialog open={open} >
        <DialogTitle style={{ margin: "auto" }}>Tin nhắn tự động</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <div className="chat-info">
            <table>
              <thead>
                {bodyData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.title}</td>
                      <td>{item.value}</td>
                    </tr>
                  );
                })}
              </thead>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleOnSubscribe}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
};

export default AddChat;
