import React, { useEffect } from "react";
import "./layout.css";
import Sidebar from "../sidebar/Sidebar";
import TopNav from "../topnav/TopNav";
import Routing from "../Routing";
import { useSelector, useDispatch } from "react-redux";
import { setMode, setColor } from "../../redux/slices/ThemeSlice"; // Điều chỉnh đường dẫn tùy thuộc vào cấu trúc thư mục của bạn

const Layout = (props) => {
  const themeReducer = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode") || "theme-mode-light";
    const colorClass = localStorage.getItem("colorMode") || "theme-mode-light";

    dispatch(setMode(themeClass));
    dispatch(setColor(colorClass));
  }, [dispatch]);

  return (
    <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
      <Sidebar {...props} />
      <div className="layout__content">
        <TopNav />
        <div className="layout__content-main">
          <Routing></Routing>
        </div>
      </div>
    </div>
  );
};

export default Layout;
