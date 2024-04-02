import React, { useState } from "react";

import DialogAdd from "../../dialogAdd/DialogAdd";
import { useDispatch } from "react-redux";
import { addUser, fetchUsers } from "../../../redux/slices/UserSlice";

const AddUser = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "Nam",
    password: "",
    confirmPassword: "",
    birthDay: new Date().toISOString().split("T")[0],
    role: "USER",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  function validatePhone(phone) {
    var re = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
    return re.test(String(phone));
  }
  const validateForm = () => {
      const { name, phone, email, password, confirmPassword } = formData;
      // Check if any field is empty
      if (!name || !phone || !email || !password || !confirmPassword) {
        alert("Vui lòng điền đầy đủ thông tin");
        return false;
      }
      // Check if phone number is valid
      if (!validatePhone(phone)) {
        alert("Số điện thoại không hợp lệ");
        return false;
      }
      // Check if email is valid
      if (!validateEmail(email)) {
        alert("Email không hợp lệ");
        return false;
      }
      // Check if password and confirmPassword match
      if (password !== confirmPassword) {
        alert("Mật khẩu không khớp");
        return false;
      }

      return true;
   
  };
  function validateEmail(email) {
    var re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    return re.test(String(email).toLowerCase());
}
  const handleSubscribe = async () => {
    if (validateForm()) {
      let user = { ...formData };
      console.log("check user", user);
      user = {
        ...user,
        role: user.role === "USER" ? "ROLE_USER" : "ROLE_ADMINISTRATOR",
        gender: user.gender === "Nam" ? true : false,
      };
      delete user.confirmPassword;
      await dispatch(addUser(user));
      await dispatch(fetchUsers());
      alert("Thêm tài khoản thành công");
      setFormData({
        name: "",
        email: "",
        phone: "",
        gender: "Nam",
        password: "",
        confirmPassword: "",
        birthDay: new Date().toISOString().split("T")[0],
        role: "USER",
      });
    } else {
      alert("Thêm tài khoản thất bại");
    }
  };

  const bodyData = [
    {
      title: "Họ và tên:",
      value: (
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      ),
    },
    {
      title: "Điện thoại:",
      value: (
        <input
          type="text"
          name="phone"
          value={formData.phone}
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
          name="birthDay"
          value={formData.birthDay}
          onChange={handleInputChange}
        />
      ),
    },
    {
      title: "Role:",
      value: (
        <select name="role" onChange={handleInputChange}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      ),
    },
  ];
  return (
    <div>
      <DialogAdd
        nameButton="Thêm tài khoản"
        title="Thêm thông tin người dùng"
        bodyData={bodyData}
        handleInputChange={handleInputChange}
        handleSubscribe={handleSubscribe}
      />{" "}
    </div>
  );
};

export default AddUser;
