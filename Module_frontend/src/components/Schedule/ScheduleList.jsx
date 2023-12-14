import React, { useState, useEffect } from "react";
import Table from "../table/Table";
import NavCard from "../Schedule/navcard/NavSchedule.jsx"
import Sort from "../sort/Sort";
import Operation from "../operation/Operation";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchedule } from "../../services/ScheduleService.js";

const customerTableHead = ["", "Nội dung", "Thời gian bắt đầu", "Thời gian kết thúc", "Xóa", "Thao tác"];
const renderHead = (item, index) => <th key={index}>{item}</th>;
const operationData = [
    { icon: "bx bxs-user-detail", name: "Chi tiết lịch làm việc" },
    { icon: "bx bx-trash", name: "Sửa thông tin lịch làm việc" },

    { icon: "bx bx-trash", name: "Xóa lịch làm việc" },
];

const sortBy = [
    { name: "", value: "Sắp xếp" },
    { name: "gần", value: "Sắp xếp mới nhất" },
    { name: "xa", value: "Sắp xếp xa nhất" },
];

const ScheduleList = () => {
    const history = useHistory()
    const [sort, setSort] = useState("");
    const handleOperationClick = (item, Data) => {
        // Xử lý thông tin người dùng và mục operation khi một mục trong danh sách được chọn
        console.log("Thông tin người dùng:", Data);
        console.log("Mục operation:", item.name);


        // Thực hiện các hành động tùy thuộc vào mục operation
        if (item.name === "Chi tiết lịch làm việc") {

            console.log("ckeck user data", Data);
            history.push(`/admin/schedule/viewSchedule/${Data.id}`);

        } else if (item.name === "Sửa thông tin lịch làm việc") {
            console.log("ckeck user data", Data);
            history.push(`/admin/schedule/editSchedule/${Data.id}`)

        } else if (item.name === "Xóa lịch làm việc") {

        }
    };
    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.content}</td>
            <td>{item.timeStart}</td>
            <td>{item.timeEnd}</td>
            <td>{(item.isDelete) ? "Chưa xóa" : "Xóa"}</td>
            <td style={{ display: "flex" }}>
                {/* <div style={{ width: "60%" }}>{item.phone}</div> */}
                <Operation
                    operation={operationData}
                    userData={item}
                    onOperationClick={handleOperationClick}
                ></Operation>
            </td>
        </tr>
    );

    const dispatch = useDispatch();
    const data= useSelector((state) => state.schedule.allSchedule.data)
    const loading= useSelector((state) => state.schedule.allSchedule.isFetching)
    // const [data, setData] = useState(fetchSchedule());


    // const customerList = data;
    useEffect(() => {
        fetchSchedule(dispatch)
    }, []);
    if (loading) {
        return (<h2>Loading</h2>)
    }

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
        <div>
            <h2 className="page-header">Quản lý lịch làm việc</h2>
            <div className="row">
                <div className="col-10" style={{ margin: "auto" }}>
                    <div className="card">
                        <div className="card-header">
                            <NavCard></NavCard>
                        </div>
                        <div style={{ margin: "auto", padding: "0 40px" }}>
                            <Sort
                                handleChange={handleChange}
                                sort={sort}
                                sortBy={sortBy}
                            ></Sort>
                        </div>
                        <div style={{ margin: "0 40px" }} className="card__body">
                            <Table
                                limit="6"
                                headData={customerTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={data}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ScheduleList;
