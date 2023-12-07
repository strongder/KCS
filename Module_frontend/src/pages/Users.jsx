import React, { useState, useEffect, useMemo, memo } from "react";
import Table from "../components/table/Table";
import "./css/Users.scss";
// import customerList from "../assets/JsonData/customers-list.json";
import NavCard from "../components/UserManagerment/navcard/NavUser";
import Sort from "../components/sort/Sort";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BodyUser from "../components/UserManagerment/BodyUser/BodyUser";
const sortBy = [
  { name: "", value: "Lọc danh sách" },
  { name: "name", value: "Xếp theo tên" },
  { name: "id", value: "Sắp mã id" },
  { name: "delete", value: "Tài khoản đã xóa" },
  { name: "Notdelete", value: "Tài khoản còn dùng" },
];

const Users = memo(() => {
  const [sort, setSort] = useState("");
  const { data, loading, searchData } = useSelector((state) => state.users);
  let list =
    data &&
    data.filter((ele) => {
      if (searchData.length === 0) {
        return ele;
      } else {
        return (
          ele.name.toLowerCase().includes(searchData.toLowerCase()) ||
          ele.phone.includes(searchData)
        );
      }
    });
  const filter = ()=>{
    if (sort === "name") {
      list = data.slice().sort((a, b) => a.name.localeCompare(b.name));
    }else if (sort === "Notdelete") {
      list = data.filter((ele) => ele.isDelete === false);
    }
    else if (sort === "delete") {
      list = data.filter((ele) => ele.isDelete === true);
    }
  }
  const handleChange =  (event) => {
     setSort(event.target.value);
   
  }; filter();
  
  console.log(sort);
  return (
    <>
      {
        <div className="user-container">
          <h2 className="page-header">Quản lý tài khoản</h2>
          <div className="row">
            <div className="col-10" style={{ margin: "auto" }}>
              <div className="card">
                <div className="card-header">
                  <NavCard></NavCard>
                </div>
                <div style={{ margin: "auto", padding: "0 62px" }}>
                  <Sort
                    handleChange={handleChange}
                    sort={sort}
                    sortBy={sortBy}
                  ></Sort>
                </div>
                <div style={{ margin: "0 40px" }} className="card__body">
                  <BodyUser data={list} loading={loading}></BodyUser>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
});

export default Users;
