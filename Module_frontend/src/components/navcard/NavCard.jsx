import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import "./NavCard.scss";
import DialogAdd from "../dialogAdd/DialogAdd";

const NavCard = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "Nam",
    birthDate: "",
  });
  const nameButton = "Thêm nhân viên";
  const title = "";
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validateForm = () => {
    const { fullName, email, password, confirmPassword, birthDate } = formData;

    // Check if any field is empty
    if (!fullName || !email || !password || !confirmPassword || !birthDate) {
      return false;
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return false;
    }

    return true;
  };
  const handleSubscribe = () => {
    // if (validateForm()) {
    if(!validateForm()){
      const user = { ...formData };
      delete user.confirmPassword;
      alert(user.fullName + "" + user.password + user.gender + user.birthDate)
    }
    //   dispatch(addUser(user));
    //   handleClose();
    // } else {
    //   // Handle validation error, show message, etc.
    //   console.log('Form validation failed');
    // }
  };
  const bodyData = [
    {
      title: "Họ và tên:",
      value: (
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
        />
      ),
    },
    {
      title: "Email:",
      value: (
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      ),
    },
    {
      title: "Mật khẩu:",
      value: (
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      ),
    },
    {
      title: "Nhập lại mật khẩu:",
      value: (
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
      ),
    },
    {
      title: "Giới tính:",
      value: (
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
        >
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
      ),
    },
    {
      title: "Ngày sinh:",
      value: (
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleInputChange}
        />
      ),
    },
  ];
  return (
    <div className="nav-card">
      <div className="row">
        <div className="col-4" style={{ margin: "auto" }}>
          {/* <Button variant="outlined" onClick={handleClickOpen}>
            Thêm tài khoản
          </Button>
          <Dialog open={open}>
            <DialogTitle style={{ margin: "auto" }}>
              Thêm thông tin người dùng
            </DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <div className="info">
                <table>
                  <tr>
                    <td style={{ width: "25%" }}>Họ và tên:</td>
                    <td>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Mật khẩu:</td>

                    <td>
                      {" "}
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Nhập lại mật khẩu:</td>
                    <td>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Giới tính</td>
                    <td>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                      >
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>Ngày sinh:</td>
                    <td>
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                </table>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubscribe}>Subscribe</Button>
            </DialogActions>
          </Dialog> */}
          <DialogAdd
            nameButton="Thêm nhân viên"
            title="Thêm thông tin người dùng"
            bodyData={bodyData}
            handleInputChange={handleInputChange}
            handleSubscribe={handleSubscribe}
          />
        </div>
        <div style={{ margin: "auto" }} className="col-6">
          <div className="nav-search">
            <input type="text" />
            <i class="bx bx-search-alt-2"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavCard;
