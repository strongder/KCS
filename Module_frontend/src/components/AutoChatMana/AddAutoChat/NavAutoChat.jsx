import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchUser } from "../../../redux/slices/UserSlice";
import AddChat from "./AddChat";

const NavAutoChat = () => {
  const [searchData, setSearchData]  = useState('');
  const dispatch = useDispatch();
  useEffect (() =>
  {
    dispatch(searchUser(searchData));
  }, [searchData])
  return (
    <div className="nav-card">
      <div className="row">
        <div className="col-4" style={{ margin: "auto" , paddingLeft: "22px"}}>
          <AddChat></AddChat>
        </div>
        <div style={{ margin: "auto",paddingRight: "22px" }} className="col-6">
          <div className="nav-search">
            <input type="search"  placeholder="Nhập nội dung ..."
             value={searchData}
             onChange={(e)=> setSearchData(e.target.value)}

            />
            <i className="bx bx-search-alt-2"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavAutoChat;
