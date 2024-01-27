// Trong InfoPanel.jsx
import React, { useState } from "react";
import "./InfoPanel.scss";
import { useSelector } from "react-redux";
import { downloadFile } from "../../../services/ResourceService";

const InfoPanel = () => {

  const { files, loading } = useSelector(state => state.resource)
  const { user } = useSelector(state => state.users)
  const [checkFile, setCheckFile] = useState(false);
  const [chooseFile, setChoseFile] = useState(false);

  const handleImage = (fileID) => {
    downloadFile(fileID);
  }

  console.log(files)
  const handleOpenListFile = () => {
    setCheckFile(true);
  }
  const handleCloseListFile = () => {
    setCheckFile(false);
  }
  const handleChooseFile = () => {
    setChoseFile(true)
  }
  const handleChooseImage = () => {
    setChoseFile(false)
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
          <div className="tab">
            <div className="tab-header">
              <i style={{ fontSize: "20px" }} class='bx bx-arrow-back' ></i>
              <p onClick={handleChooseImage}>Ảnh</p>
              <p style={{ borderLeft: "1px solid #ccc" }} onClick={handleChooseFile}>File</p>
            </div>
            <hr />
            {files && !chooseFile ? (
              <div className="tab-image">
                {files.map((file, index) => {
                  if (file.type.includes('image')) {
                    return (
                      <div key={index} className="item-img" onClick={()=>downloadFile(file.id)}>
                        <img src={`data:image;base64, ${file.data}`} alt="" />
                      </div>
                    )
                  }
                })}
              </div>
            ) : (<div className="tab-file">
              {files.map((file, index) => {
                if (!file.type.includes('image')) {
                  return (
                    <div key={index} className="item-file" onClick={()=>downloadFile(file.id)}>
                      <i class='bx bx-file'></i> <span style={{ fontSize: "16px" }}>{file.name}</span>
                    </div>
                  )
                }
              })}
            </div>)}</div>
        </>
      )}

    </div>
  );
};

export default InfoPanel;
