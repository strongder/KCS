// Trong InfoPanel.jsx
import React, { useState } from "react";
import "./InfoPanel.scss";
import { useSelector } from "react-redux";

const InfoPanel = () => {

  const { user } = useSelector(state => state.users)
  const [checkFile, setCheckFile] = useState(false);
  const [chooseFile, setChoseFile] = useState(false);

  const handleOpenListFile = () => {
    setCheckFile(true);
  }
  const handleCloseListFile = () => {
    setCheckFile(false);
  }
  const handleChooseFile = () => {
    setChoseFile(true)
  }

  return (
    <div className="info-panel">
      {!checkFile ? (
        <>
          <div className="info-content">
            <div className="avatar">
              <img src={`data:image;base64, ${user.avt}`} alt="" />
            </div>
            <div className="info-item">
              <span className="info-value">{user.name}</span>
            </div>
          </div>
          <hr />
          <div className="open-file" onClick={handleOpenListFile}>
            <p>File phương tiện và file</p> <i class='bx bx-chevron-right'></i>
          </div>
        </>) : (
        <>
          <div className="tab"></div>
          <i class='bx bx-arrow-back' ></i>
          <p>Ảnh</p>
          <p>File</p>
          {chooseFile ? (
            <div className="list-image">

            </div>
          ) : (<div className="list-file">

          </div>)}
        </>
      )}

    </div>
  );
};

export default InfoPanel;
