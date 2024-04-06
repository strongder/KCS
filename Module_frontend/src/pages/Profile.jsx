import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUser, updateUser } from "../redux/slices/UserSlice";
import { Link, useHistory } from "react-router-dom";

import './css/Profile.scss'
import { current } from "@reduxjs/toolkit";

const Profile = () => {
  const [selectFile, setSelectFile] = useState(null);
  const [fileBase64String, setFileBase64String] = useState("");
  const [profile, setProfile] = useState({
    maTK: "",
    name: "",
    avt: ` `,
    email: "",
    phone: "",
    birthDay: "",
    gender: "",
    role: "",
  });

  const history = useHistory();
  const { currentUser, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      avt: `data:image; base64, ${fileBase64String} `
    }));
  };
  function validatePhone(phone) {
    var re = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
    return re.test(String(phone));
  }
  const validateForm = () => {
    const { name, phone} = profile;
    // Check if any field is empty
    if (!name || !phone  ) {
      alert("Vui lòng điền đầy đủ thông tin");
      return false;
    }
    // Check if phone number is valid
    if (!validatePhone(phone)) {
      alert("Số điện thoại không hợp lệ");
      return false;
    }
    return true;
 
};
  const handleImageChange = (e) => {
    setSelectFile(e.target.files[0]);

  };

  const encodeFileBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result.split(",")[1]);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    const loadFile = async () => {
      if (selectFile) {
        try {
          const base64String = await encodeFileBase64(selectFile);
          setFileBase64String(base64String);
        } catch (error) {
          console.error("Error encoding file to base64:", error);
        }
      }
    };
    loadFile();
  }, [selectFile]);

  useEffect(() => {
    // Set editUser values when user data is available
    if (currentUser) {
      setProfile({
        maTK: currentUser.maTK,
        avt: `data:image; base64, ${currentUser.avt} `,
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        birthDay: currentUser.birthDay,
        gender: currentUser.gender === true ? "Nam" : "Nữ",
        role: currentUser.role === "ROLE_USER" ? "USER" : "ADMIN",
      });

      setFileBase64String(currentUser.avt)
    }
  }, [currentUser]);

  const handleUpdateProfile = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      let newUser = { ...currentUser, ...profile };

      const gender = newUser.gender === "Nam";
      const role = newUser.role === "USER" ? "ROLE_USER" : "ROLE_ADMINISTRATOR";


      newUser = { ...newUser, gender, role, avt: fileBase64String };

      await dispatch(updateCurrentUser(newUser));
      alert("Cập nhật thông tin thành công");
      history.push("/");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      {!loading && currentUser && (
        <div className="profile">
          <h2>Thông tin cá nhân</h2>
          <div className="profile-avt">
            <label htmlFor="avatarInput" className="change-avatar-text">
            <img src={`data:image/png;base64, ${fileBase64String || ""}`} alt="Avatar" />
            </label>
            <input
              id="avatarInput"
              type="file"
              style={{ display: 'none' }} /* Hide the file input */
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
          <div className="profile-info">
            <div className="info-item">
              <label>Mã tài khoản</label>

              <input type="text" name="maTK" value={profile.maTK} readOnly />
            </div>
            <div className="info-item">
              <label>Họ tên</label>
              <input type="text" name="name" value={profile.name} onChange={handleInputChange} />
            </div>
            <div className="info-item">
              <label>Email</label>
              <input type="text" name="email" value={profile.email} readOnly />
            </div>
            <div className="info-item">
              <label>Số điện thoại</label>
              <input type="text" name="phone" value={profile.phone} onChange={handleInputChange} />
            </div>
            <div className="info-item">
              <label>Ngày sinh</label>
              <input type="text" name="birtDay" value={profile.birthDay} onChange={handleInputChange} />
            </div>
            <div className="info-item">
              <label>Giới tính</label>
              <input type="text" name="gender" value={profile.gender} readOnly />
            </div>
            <div className="info-item">
              <label>Vai trò</label>
              <input type="text" name="role" value={profile.role} readOnly />
            </div>
          </div>
          <div className="button">
            <Link to='/'><button>Thoát</button></Link>
            <button type="submit" onClick={handleUpdateProfile}>Lưu</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;



