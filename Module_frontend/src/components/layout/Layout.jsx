import React, { useEffect } from "react";
import "./layout.css";
import Sidebar from "../sidebar/Sidebar";
import TopNav from "../topnav/TopNav";
import Routing from "../Routing";
import { useSelector, useDispatch } from "react-redux";
import { setMode, setColor } from "../../redux/slices/ThemeSlice"; // Điều chỉnh đường dẫn tùy thuộc vào cấu trúc thư mục của bạn
import { jwtDecode } from "jwt-decode";
import { fetchUserByUsername } from "../../redux/slices/UserSlice";

const Layout = (props) => {
  const themeReducer = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const {user, loading} = useSelector(state=>state.users)
  
  const token = localStorage.getItem('token')
  const username = jwtDecode(token).sub

  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode") || "theme-mode-light";
    const colorClass = localStorage.getItem("colorMode") || "theme-mode-light";

    dispatch(setMode(themeClass));
    dispatch(setColor(colorClass));
  }, [dispatch]);

  useEffect(() => {
    console.log(username)
    dispatch(fetchUserByUsername(username));
}, [dispatch, username]);


  return (
    <>
   { !loading && user &&
    <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
      <Sidebar {...props} />
      <div className="layout__content">
        <TopNav user = {user}/>
        <div className="layout__content-main">
          <Routing></Routing>
        </div>
      </div>
    </div>}</>
  );
};

export default Layout;
