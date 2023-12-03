import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import "./UserDetail.scss";
import { fetchUserById } from "../../../redux/slices/UserSlice";

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if(!user){
    return<div>del có đâu mà tìm</div>
  }

  const bodyData = [
    {
      title: "Mã tài khoản: ",
      value: user ? user.userId : "",
    },
    {
      title: "Họ và tên:",
      value: user ? user.name : "",
    },
    {
      title: "Email:",
      value: user ? user.email : "",
    },
    {
      title: "Giới tính:",
      value: user ? user.gender : "",
    },
    {
      title: "Số điện thoại:",
      value: user ? user.phone : "",
    },
    {
      title: "Ngưởi tạo:  ",
      value: user ? user.createBy : "",
    },
    {
      title: "Người sửa",
      value: user ? user.updateBy : "",
    },

    {
      title: "Ngày tạo:",
      value: user ? user.createDate : "",
    },
    {
      title: "Ngày sửa:",
      value: user ? user.updateDate : "",
    },
  ];

  return (
    <div className="user-detail">
      <h2>Thông tin chi tiết tài khoản</h2>
      <div className="user-detail-container">
        <div className="avatar">
          avatar
          {/* <img src={filteredUser.avatar} alt="ảnh đại diện" /> */}
        </div>
        <div className="list-field">
          {bodyData.map((item, index) => (
            <div key={index} className="field">
              <label>
                {" "}
                <i class="bx bxs-star"></i>
                {item.title}
              </label>
              <input type="text" value={item.value} readOnly />
            </div>
          ))}
          <div className="field" style={{ margin: "20px 0" }}>
            <i class="bx bxs-star"></i>
            <label>Đã xóa:</label>
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
