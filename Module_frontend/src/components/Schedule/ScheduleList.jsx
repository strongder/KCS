import React, { useState, useEffect } from "react";
import Table from "../table/Table";
// import customerList from "../assets/JsonData/customers-list.json";
import NavCard from "../Schedule/navcard/NavSchedule.jsx"
import Sort from "../sort/Sort";
import Operation from "../operation/Operation";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchedule } from "../../redux/services/ScheduleService.js";

const customerTableHead = ["", "Nội dung", "Thời gian bắt đầu", "Thời gian kết thúc", "Xóa", "Thao tác"];
const renderHead = (item, index) => <th key={index}>{item}</th>;
const operationData = [
    { icon: "bx bxs-user-detail", name: "Chi tiết lịch làm việc" },
    { icon: "bx bx-trash", name: "Sửa thông tin lịch làm việc" },
];

const sortBy = [
    { name: "1", value: "Sắp xếp" },
    { name: "2", value: "Sắp xếp mới nhất" },
    { name: "3", value: "Sắp xếp xa nhất" },
    { name: "4", value: "Hiển thị lịch làm việc chưa xóa" },
    { name: "5", value: "Hiển thị lịch làm việc đã xóa" },
];

const ScheduleList = () => {
    const history = useHistory()
    const [sort, setSort] = useState("1");
    const handleOperationClick = (item, Data) => {
        // Thực hiện các hành động tùy thuộc vào mục operation
        if (item.name === "Chi tiết lịch làm việc") {

            console.log("ckeck user data", Data);
            history.push(`/admin/schedule/viewSchedule/${Data.id}`);

        } else if (item.name === "Sửa thông tin lịch làm việc") {
            console.log("ckeck user data", Data);
            history.push(`/admin/schedule/editSchedule/${Data.id}`)
        }
    };

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.content}</td>
            <td>{item.timeStart}</td>
            <td>{item.timeEnd}</td>
            <td>{(!item.isDelete) ? "Chưa xóa" : "Xóa"}</td>
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
    const [list, setList] = useState([]);
  
    const filter = () => {
        if(sort === "2") {
            list = data.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            // setList(newList
            console.log(list.length);
            // list = data.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        } else if (sort === "3") {
            list = data.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            console.log(list);
        } else  if (sort === "4") {
            list = data.slice().filter((item) => item.isDelete === false)
            console.log(list);
        } else if (sort === "5") {
            list = data.slice().filter((item) => item.isDelete === true)
            console.log(list);
        }
    }

    const search = (index) => {
        console.log(index);
        setList(data.slice().filter((item) => { return (item.content.includes(index) || item.date.includes(item)) }));
        // console.log(list)
        return list;
    }   
    useEffect(() => {
        fetchSchedule(dispatch)
        setList(data);
    }, []);
    if (loading) {
        return (<h2>Loading</h2>)
    }

    const handleChange = (event) => {
        setSort(event.target.value);
        console.log(sort)
    };
    filter();
    // search()
    // console.log(search());

    console.log(list);

    return (
        <div>
            <h2 className="page-header">Quản lý lịch làm việc</h2>
            <div className="row">
                <div className="col-10" style={{ margin: "auto" }}>
                    <div className="card">
                        <div className="card-header">
                            <NavCard handleSearch={search}></NavCard>
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
                                limit="10"
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
    );
};
export default ScheduleList;
