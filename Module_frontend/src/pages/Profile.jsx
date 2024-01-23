import React, { useEffect } from "react";
import "./css/Profile.scss";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../redux/slices/UserSlice";
import { Link } from "react-router-dom";


const Profile = () => {
  const [profile, setProfile] = useState(
    {
      maTK:'',
      name:'',
      email:'',
      phone:'',
      birthDay:'',
      gender:'',
      role:'',
    }
  )
  const {currentUser, loading} = useSelector(state=> state.users)
  const {avatar} = useSelector(state => state.resource)
  const img = `data:image; base64, ${avatar.data}`
  const dispatch = useDispatch()
  const userId = localStorage.getItem('id')
  
  const handleInputChange = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
   dispatch( fetchCurrentUser(userId));
}, [dispatch,currentUser]);

useEffect(() => {
  // Set editUser values when user data is available
  if (currentUser) {
    setProfile({
      maTK: currentUser.maTK,
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone,
      birthDay: currentUser.birthDay,
      gender: currentUser.gender===true?'Nam':'Nữ',
      role: currentUser.role ==="ROLE_USER"?"USER":'ADMIN',
    });
  }
}, [currentUser]);

  
  return (
    <>
      {!loading && currentUser && (
        <div className="profile">
          <h2>Thông tin cá nhân</h2>
          <div className="profile-avt">
            <img src={img} alt="" />
          </div>
          <div className="profile-info">
            <div className="info-item">
              <label>Mã tài khoản</label>

              <input type="text" name="maTK" value={profile.maTK} readOnly />
            </div>
            <div className="info-item">
              <label>Họ tên</label>
              <input type="text" name="name"  value={profile.name} onChange={handleInputChange} />
            </div>
            <div className="info-item">
              <label>Email</label>
              <input type="text" name="email" value={profile.email} onChange={handleInputChange}/>
            </div>
            <div className="info-item">
              <label>Số điện thoại</label>
              <input type="text" name= "phone" value={profile.phone} onChange={handleInputChange}/>
            </div>
            <div className="info-item">
              <label>Ngày sinh</label>
              <input type="text" name= "birtDay" value={profile.birthDay} onChange={handleInputChange}/>
            </div>
            <div className="info-item">
              <label>Giới tính</label>
              <input type="text" name= "gender" value={profile.gender} readOnly/>
            </div>
            <div className="info-item">
              <label>Vai trò</label>
              <input type="text" name="role" value={profile.role} readOnly />
            </div>
          </div>
          <div className="button">
              <Link to = '/'><button>Thoát</button></Link>
               <button type="submit">Lưu</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
