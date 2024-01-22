// Trong InfoPanel.jsx
import React from "react";
import "./InfoPanel.scss";
import { useSelector } from "react-redux";

const InfoPanel = () => {

    const {user} = useSelector(state=>state.users)

  return (
    <div className="info-panel">
      <div className="info-header">User Information</div>
      <div className="info-content">
        <div className="info-item">
          <span className="info-label">Name:</span>
          <span className="info-value">{user.name}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Email:</span>
          <span className="info-value">{user.email}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Phone:</span>
          <span className="info-value">{user.phone}</span>
        </div>
        {user.profileImage && ( // Kiểm tra nếu có ảnh đại diện
          <div className="info-item">
            <span className="info-label">Profile Image:</span>
            <img
              className="info-value profile-image"
              src={user.profileImage}
              alt="Profile"
            />
          </div>
        )}
        {user.sentFiles && ( // Kiểm tra nếu có file đã gửi
          <div className="info-item">
            <span className="info-label">Sent Files:</span>
            <ul className="info-value file-list">
              {user.sentFiles.map((file, index) => (
                <li key={index}>
                  <a href={file.url} target="_blank" rel="noopener noreferrer">
                    {file.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;
