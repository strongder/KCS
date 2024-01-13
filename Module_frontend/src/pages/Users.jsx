import React, { useState } from "react";
import "./css/Users.scss";
import NavCard from "../components/UserManagerment/navcard/NavUser";
import Sort from "../components/sort/Sort";
import { useDispatch, useSelector } from "react-redux";
import BodyUser from "../components/UserManagerment/BodyUser/BodyUser";
const sortByOptions = [
  { name: "", value: "Lọc danh sách" },
  { name: "name", value: "Xếp theo tên" },
  { name: "delete", value: "Tài khoản đã xóa" },
  { name: "Notdelete", value: "Tài khoản còn dùng" },
];

const Users = () => {
  const dispatch = useDispatch();
  const { data, loading, searchData } = useSelector((state) => state.users);
  const [sort, setSort] = useState("");

  const filteredList = () => {
    if (!data) return [];

    let filteredData = data;

    if (searchData.length > 0) {
      filteredData = data.filter(
        (ele) =>
          ele.name.toLowerCase().includes(searchData.toLowerCase()) ||
          ele.phone.includes(searchData)
      );
    }
    if (sort === "name") {
      return filteredData.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "Notdelete") {
      return filteredData.filter((ele) => ele.isDelete === false);
    } else if (sort === "delete") {
      return filteredData.filter((ele) => ele.isDelete === true);
    }

    return filteredData;
  };
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  return (
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
                sortBy={sortByOptions}
              ></Sort>
            </div>
            <div style={{ margin: "0 40px" }} className="card__body">
              <BodyUser data={filteredList()} loading={loading}></BodyUser>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
