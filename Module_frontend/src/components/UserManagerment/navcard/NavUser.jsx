import React, { useEffect, useState } from "react";
import "./NavUser.scss";
import AddUser from "../AddUser/AddUser";
import { useDispatch } from "react-redux";
import { searchUser } from "../../../redux/slices/UserSlice";

const NavCard = () => {
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
          <AddUser></AddUser>
        </div>
        <div style={{ margin: "auto",paddingRight: "22px" }} className="col-6">
          <div className="nav-search">
            <input type="search"  placeholder="Nhập tên hoặc mã tài khoản ..."
             value={searchData}
             onChange={(e)=> setSearchData(e.target.value)}

            />
            <i class="bx bx-search-alt-2"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavCard;
