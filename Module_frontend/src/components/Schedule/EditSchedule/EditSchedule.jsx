import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./EditSchedule.scss";
// import { fetchUserById, updateUser } from "../../../redux/slices/UserSlice";
import { useHistory } from "react-router-dom";
import { updateSchedule } from "../../../redux/services/ScheduleService";
import { fetchScheduleById } from "../../../redux/services/ScheduleService";
// import { editableInputTypes } from "@testing-library/user-event/dist/utils";
import { removeSchedule } from "../../../redux/services/ScheduleService";

const EditSchedule = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { schedule, loading } = useSelector((state) => state.schedule.getScheduleByID);
  const history = useHistory("");
  const [editSchedule, setEditschedule] = useState({
    id: "",
    date: "",
    status: "",
    timeStart: "",
    timeEnd: "",
    content: "",
    createDate: "",
    updateDate: "",
    createBy: "",
    updateBy: "",
    isDelete: ""
  });

  useEffect(() => {
    fetchScheduleById(id, dispatch);
  }, []);

  useEffect(() => {
    // Set editschedule values when schedule data is available
    if (schedule) {
      setEditschedule({
        id: schedule.id,
        content: schedule.content,
        date: schedule.date,
        status: schedule.status,
        timeStart: schedule.timeStart,
        timeEnd: schedule.timeEnd,
        createDate: schedule.createDate,
        updateDate: schedule.updateDate,
        createBy: schedule.createBy,
        updateBy: schedule.updateBy,
        isDelete: schedule.isDelete
      });
    }
  }, [schedule]);
  // console.log("check edit user", schedule);
  const handleUpdateUser = () => {
    const newSchedule = { ...schedule, ...editSchedule };

    updateSchedule(newSchedule, dispatch).then(() => {
      history.push("/admin/schedule");
    });
    console.log(newSchedule)
  };
  const handleInputChange =(e) =>{
    setEditschedule((prev) =>({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleButtonDelete = async() => {
    await removeSchedule(id, dispatch);
    history.push("/admin/schedule");
  }

  return (
    <div className="user-detail">
      <h2>Chỉnh sửa thông tin lịch làm việc</h2>
      <div className="user-detail-container">
        <div className="list-field">
          <label>
            <i className="bx bxs-star"></i>
            Mã lịch:
          </label>
          <input
            type="text"
            name="id" // Use item.title as the name for better identification
            value={editSchedule.id}
            onChange={handleInputChange}
            readOnly
          />
         <label>
            <i className="bx bxs-star"></i>
            Nội dung:
          </label>
          <input
            type="text"
            name="content" // Use item.title as the name for better identification
            value={editSchedule.content}
            onChange={handleInputChange}
          />
          <label>
            <i className="bx bxs-star"></i>
            Trạng thái:
          </label>
          <input
            type="text"
            name="status" // Use item.title as the name for better identification
            value={(editSchedule.status) ? "Đi làm" : "Nghỉ"}
            onChange={e=>setEditschedule(e.target.value)}
          />
          <label>
            <i className="bx bxs-star"></i>
            date:
          </label>
          <input
            type="text"
            name="date" // Use item.title as the name for better identification
            value={editSchedule.date}
            onChange={handleInputChange}
          />
          <label>
            <i className="bx bxs-star"></i>
            timeStart:
          </label>
          <input
            type="text"
            name="timeStart" // Use item.title as the name for better identification
            value={editSchedule.timeStart}
            onChange={handleInputChange}
          />
          <label>
            <i className="bx bxs-star"></i>
            timeEnd:
          </label>
          <input
            type="text"
            name="timeEnd" // Use item.title as the name for better identification
            value={editSchedule.timeEnd}
            onChange={handleInputChange}
          />
          <label>
            <i className="bx bxs-star"></i>
            createDate:
          </label>
          <input
            type="text"
            name="createDate" // Use item.title as the name for better identification
            value={editSchedule.createDate}
            onChange={handleInputChange}
            readOnly
          />
          <label>
            <i className="bx bxs-star"></i>
            createBy:
          </label>
          <input
            type="text"
            name="createBy" // Use item.title as the name for better identification
            value={editSchedule.createBy}
            onChange={handleInputChange}
            readOnly
          />
          <label>
            <i className="bx bxs-star"></i>
            updateDate:
          </label>
          <input
            type="text"
            name="updateDate" // Use item.title as the name for better identification
            value={editSchedule.updateDate}
            onChange={handleInputChange}
            readOnly
          />
          <label>
            <i className="bx bxs-star"></i>
            updateBy:
          </label>
          <input
            type="text"
            name="updateBy" // Use item.title as the name for better identification
            value={editSchedule.updateBy}
            onChange={handleInputChange}
            readOnly
          />
          <label>
            <i className="bx bxs-star"></i>
            isDelete:
          </label>
          <input
            type="text"
            name="isDelete" // Use item.title as the name for better identification
            value={editSchedule.isDelete}
            onChange={handleInputChange}
            readOnly
          />
        </div>
      </div>
      <div className="button">
        <Link className="cancel" to="/admin/schedule">
          <button>Hủy</button>
        </Link>
        <button className="submit" onClick={handleUpdateUser}>
          Xác nhận
        </button>
        <button className="delete_schedule" onClick={handleButtonDelete}>
          Xoá
        </button>
      </div>
    </div>
  );
};

export default EditSchedule;
