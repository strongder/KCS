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
  const handleOnSubscribe = () => {
    handleSubscribe();
    handleClose();
  };
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        {nameButton}
      </Button>
      <Dialog open={open} >
        <DialogTitle style={{ margin: "auto" }}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <div className="info">
            <table>
              <tbody>
                {bodyData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.title}</td>
                      <td>{item.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleOnSubscribe()}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogAdd;
