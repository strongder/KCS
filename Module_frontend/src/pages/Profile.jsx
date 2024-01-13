import React, { useEffect, useSyncExternalStore } from "react";
import "./css/Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../redux/slices/UserSlice";

const Profile = () => {
  const id = 87;
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);
  return (
    <>
      {!loading && user && (
        <div className="profile">
          <h2>Thông tin cá nhân</h2>
          <div className="profile-avt">
            <img src={user.avt} alt="" />
            <p>name</p>
          </div>
          <div className="profile-info">
            <div className="info-item">
              <label>Mã tài khoản</label>
              <input type="text" value={user.maTK} />
            </div>
            <div className="info-item">
              <label>Họ tên</label>
              <input type="text" value={user.name} />
            </div>
            <div className="info-item">
              <label>Email</label>
              <input type="text" value={user.email} />
            </div>
            <div className="info-item">
              <label>Số điện thoại</label>
              <input type="text" value={user.phone} />
            </div>
            <div className="info-item">
              <label>Ngày sinh</label>
              <input type="text" value={user.birthDay} />
            </div>
            <div className="info-item">
              <label>Vai trò</label>
              <input type="text" value={user.role === "ROLE_USER"? "USER": 'ADMIN'} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
