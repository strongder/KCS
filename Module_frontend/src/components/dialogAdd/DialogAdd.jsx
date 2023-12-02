import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import "./DialogAdd.scss";

const DialogAdd = (props) => {
  const { nameButton, title, bodyData, handleInputChange, handleSubscribe } =
    props;
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        {nameButton}
      </Button>
      <Dialog open={open} style={{minWidth: "700px"}}>
        <DialogTitle style={{ margin: "auto" }}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <div className="info">
            <table>
              {bodyData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.value}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubscribe}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogAdd;
