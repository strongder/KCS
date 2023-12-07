import React, { useState, useEffect } from "react";
import Table from "../../table/Table";
import Operation from "../../operation/Operation";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, removeUser } from "../../../redux/slices/UserSlice";

const customerTableHead = [
  "",
  "Họ tên",
  "Email",
  "Điện Thoại",
  "Hoạt động",
  "Thao Tác",
];
const renderHead = (item, index) => <th key={index}>{item}</th>;
const operationData = [
  { icon: "bx bxs-user-detail", name: "Chi tiết người dùng" },
  { icon: "bx bx-trash", name: "Sửa thông tin người dùng" },

  { icon: "bx bx-trash", name: "Xóa người dùng" },
];

const sortBy = [
  { name: "", value: "Sắp xếp" },
  { name: "name", value: "Sắp xếp theo tên" },
  { name: "id", value: "Sắp mã id" },
];

const BodyUser = (props) => {
  const history = useHistory();
  const userList = props.data;
  const handleOperationClick = (item, userData) => {
    if (item.name === "Chi tiết người dùng") {
      console.log("ckeck user data", userData);
      history.push(`/admin/user/viewUser/${userData.id}`);
    } else if (item.name === "Sửa thông tin người dùng") {
      console.log("ckeck user data", userData);
      history.push(`/admin/user/editUser/${userData.id}`);
    } else if (item.name === "Xóa người dùng") {
      dispatch(removeUser(userData.id));
    }
  };
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td> {item.phone}</td>
      <td style={{ width: "140px", margin: "auto" }}>
        <div style={{ width: "75%", display: "flex" }} className="isdelete">
          {item.isDelete ? (
            <i
              style={{ margin: "auto", color: "blue", fontSize: "25px" }}
              class="bx bx-check-circle"
            ></i>
          ) : (
            <i
              style={{ margin: "auto", color: "red", fontSize: "25px" }}
              class="bx bx-x-circle"
            ></i>
          )}
        </div>
      </td>
      <td style={{ width: "96px", margin: "auto" }}>
        <Operation
          operation={operationData}
          userData={item}
          onOperationClick={handleOperationClick}
        ></Operation>
      </td>
    </tr>
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      {!props.loading && (
        <Table
          limit="8"
          headData={customerTableHead}
          renderHead={(item, index) => renderHead(item, index)}
          bodyData={props.data}
          renderBody={(item, index) => renderBody(item, index)}
        />
      )}
    </>
  );
};

export default BodyUser;
