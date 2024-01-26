import React, { useEffect, useState } from "react";
import "./layout.css";
import Sidebar from "../sidebar/Sidebar";
import TopNav from "../topnav/TopNav";
import Routing from "../Routing";
import { useSelector, useDispatch } from "react-redux";
import { setMode, setColor } from "../../redux/slices/ThemeSlice";
import { jwtDecode } from "jwt-decode";
import { fetchCurrentUser, fetchUserByUsername } from "../../redux/slices/UserSlice";
import { fetchFileById } from "../../redux/slices/ResourceSlice";

const Layout = (props) => {
  const themeReducer = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const {currentUser, loading} = useSelector(state=>state.users)

  const {avatar} = useSelector(state=>state.resource)

  const token = localStorage.getItem('token');

  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode") || "theme-mode-light";
    const colorClass = localStorage.getItem("colorMode") || "theme-mode-light";

    dispatch(setMode(themeClass));
    dispatch(setColor(colorClass));
  }, [dispatch]);

  

  useEffect(() => {
    dispatch(fetchCurrentUser(localStorage.getItem('id')))
  }, [dispatch ]);
 
  useEffect(() => {
    if (currentUser && currentUser.avt) {
      // dispatch(fetchFileById(currentUser.avt));
    }
  }, [dispatch, currentUser]);
  
  

  return (
    <>
     
      {!loading &&currentUser &&  (
        <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
          <Sidebar {...props} />
          <div className="layout__content">
            <TopNav user={currentUser} />
            <div className="layout__content-main">
              <Routing role={currentUser.role}></Routing>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
