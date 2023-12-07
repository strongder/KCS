import React, { useEffect, useState } from "react";
import Sort from "../../sort/Sort";
import Table from "../../table/Table.jsx";
import studentList from "../../../assets/JsonData/customers-list.json";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.js";


const customerTableHead = [
  "",
  "Họ tên",
  "Email",
  "Điện Thoại",
  "Hoạt động",
  "Thao Tác",
];
const renderHead = (item, index) => <th key={index}>{item}</th>;
const sortBy = [
  { name: "", value: "Sắp xếp" },
  { name: "name", value: "Sắp xếp theo tên" },
  { name: "id", value: "Sắp mã id" },
];

const Students = () => {
  const [sort, setSort] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUser = async () => {
    try {
      const result = await axios.get("http://localhost:8081/api/v1/user");
      await setList(result.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const { id } = useParams();
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8081/api/v1/user/delete/${id}`);
    loadUser();
  };
  useEffect(() => {
    loadUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td> {item.phone}</td>
      <td style={{ width: "140px" }}>
        <div style={{ width: "75%", display: "flex" }} className="isdelete">
          {item.isDelete ? (
            <i
              style={{ color: "blue", fontSize: "25px" }}
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
      <td
        style={{
          width: "96px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Link to="/student/id"> */}
        <i
          onClick={() => deleteUser(item.id)}
          style={{ fontSize: "20px", alignItems: "center" }}
          class="bx bxs-user-detail"
        ></i>
        {/* </Link> */}
      </td>
    </tr>
  );

  const handleChange = (event) => {
    setSort(event.target.value);
    // if (event.target.value === "name") {
    //   const sortedList = [...list].sort((a, b) => a.name.localeCompare(b.name));
    //   setList(sortedList);
    // } else if (event.target.value === "id") {
    //   const sortedList = [...list].sort((a, b) => a.id - b.id);
    //   setList(sortedList);
    // }
  };

  return (
    <>
      {
        <div className="user-container">
          <h2 className="page-header">Danh sách sinh viên</h2>
          <div className="row">
            <div className="col-10" style={{ margin: "auto" }}>
              <div className="card">
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  className="card-header"
                >
                  <div style={{ width: "40%" }} className="nav-search">
                    <input type="text" />
                    <i class="bx bx-search-alt-2"></i>
                  </div>
                  <div style={{ width: "40%" }}>
                    <Sort
                      handleChange={handleChange}
                      // sort={sort}
                      sortBy={sortBy}
                    ></Sort>
                  </div>
                </div>
                <div style={{ margin: "0 62px" }} className="card__body">
                  {/* <Table1
                    limit="3"
                    customerTableHead={customerTableHead}
                    list={list}
                    deleteUser={deleteUser}
                  /> */}
                  <Table
                    limit="8"
                    headData={customerTableHead}
                    renderHead={(item, index) => renderHead(item, index)}
                    bodyData={list}
                    renderBody={(item, index) => renderBody(item, index)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Students;
