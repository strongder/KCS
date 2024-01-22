import React, { useEffect } from "react";
import "./css/Profile.scss";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByUsername } from "../redux/slices/UserSlice";

const Profile = () => {
  
  const {currentUser, loading} = useSelector(state=> state.users)
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const username = jwtDecode(token).sub


  useEffect(() => {
   dispatch( fetchUserByUsername(username));
}, [dispatch, username]);
  return (
    <>
      {!loading && currentUser && (
        <div className="profile">
          <h2>Thông tin cá nhân</h2>
          <div className="profile-avt">
            <img src={currentUser.avt} alt="" />
          </div>
          <div className="profile-info">
            <div className="info-item">
              <label>Mã tài khoản</label>

              <input type="text" value={currentUser.maTK} />
            </div>
            <div className="info-item">
              <label>Họ tên</label>
              <input type="text" value={currentUser.name} />
            </div>
            <div className="info-item">
              <label>Email</label>
              <input type="text" value={currentUser.email} />
            </div>
            <div className="info-item">
              <label>Số điện thoại</label>
              <input type="text" value={currentUser.phone} />
            </div>
            <div className="info-item">
              <label>Ngày sinh</label>
              <input type="text" value={currentUser.birthDay} />
            </div>
            <div className="info-item">
              <label>Vai trò</label>
              <input type="text" value={currentUser.role === "ROLE_USER"? "USER": 'ADMIN'} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
