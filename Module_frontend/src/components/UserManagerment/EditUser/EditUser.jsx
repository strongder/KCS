import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./EditUser.scss";
import { fetchUserById, updateUser } from "../../../redux/slices/UserSlice";
import { useHistory } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.users);
  const history = useHistory("");
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    phone: "",
    birthDay: "",
    gender: "",
    role: "",
  });

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    // Set editUser values when user data is available
    if (user) {
      setEditUser({
        name: user.name,
        email: user.email,
        phone: user.phone,
        birthDay: user.birthDay,
        gender: user.gender === true ? "Nam" : "Nữ",
        role: user.role === "ROLE_USER" ? "USER" : "ADMIN",
      });
    }
  }, [user]);

  function validateEmail(email) {
    var re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    return re.test(String(email).toLowerCase());
  }
  function validatePhone(phone) {
    var re = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
    return re.test(String(phone));
  }
  const validateForm = () => {
    const { name, phone, email } = editUser;
    // Check if any field is empty
    if (!name || !phone || !email ) {
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

    return true;
  };
  const handleUpdateUser = () => {
    if (!validateForm()) return;
    let newUser = { ...user, ...editUser };
    const gender = newUser.gender === "Nam" ? true : false;
    const role = newUser.role === "USER" ? "ROLE_USER" : "ROLE_ADMINISTRATOR";
    newUser = { ...newUser, role, gender };
    dispatch(updateUser(newUser)).then(() => {
      alert("Cập nhật thông tin tài khoản thành công")
      history.push("/admin/user");
    });
  };
  const handleInputChange = (e) => {
    setEditUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="user-edit">
      <h2>Chỉnh sửa thông tin tài khoản</h2>
      <div className="user-edit-container">
        <div className="avatar">
          <img
            src={user ? `data:image; base64, ${user.avt}` : null}
            alt="ảnh đại diện"
          />
        </div>
        <div className="list-field">
          <label>
            <i className="bx bxs-star"></i>
            Họ và tên:
          </label>
          <input
            type="text"
            name="name" // Use item.title as the name for better identification
            value={editUser.name}
            onChange={handleInputChange}
          />
          <label>
            <i className="bx bxs-star"></i>
            Email:
          </label>
          <input
            type="text"
            name="email" // Use item.title as the name for better identification
            value={editUser.email}
            onChange={handleInputChange}
          />
          <label>
            <i className="bx bxs-star"></i>
            Số điện thoại:
          </label>
          <input
            type="text"
            name="phone" // Use item.title as the name for better identification
            value={editUser.phone}
            onChange={handleInputChange}
          />
          <label>
            <i className="bx bxs-star"></i>
            Ngày sinh:
          </label>
          <input
            style={{ paddingRight: "20px" }}
            type="date"
            name="birthDay" // Use item.title as the name for better identification
            value={editUser.birthDay}
            onChange={handleInputChange}
          />
          <label>
            <i className="bx bxs-star"></i>
            Giới tính:
          </label>
          <select
            name="gender"
            value={editUser.gender}
            onChange={handleInputChange}
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
          <label>
            <i className="bx bxs-star"></i>
            Vai trò:
          </label>
          <select
            name="role"
            value={editUser.role}
            onChange={handleInputChange}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
      </div>
      <div className="button">
        <Link className="cancel" to="/admin/user">
          <button>Hủy</button>
        </Link>
        <button className="submit" onClick={handleUpdateUser}>
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default EditUser;
