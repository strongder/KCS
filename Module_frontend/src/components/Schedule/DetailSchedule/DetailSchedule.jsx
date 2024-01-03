import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import "./DetailSchedule.scss";
import { fetchScheduleById} from "../../../services/ScheduleService";
import Button from '@mui/material/Button';

const DetailSchedule = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { schedule, loading, error } = useSelector((state) => state.schedule.getScheduleByID);
  useEffect(() => {
    fetchScheduleById(id, dispatch);
  }, []);

  // console.log(schedule)

  if (loading) {
    return <div>Loading...</div>;
    // console.log(schedule);
  }
  if(!schedule){
    return<div>del có đâu mà tìm</div>
  }

  console.log(schedule)

//   console.log("user", schedule);
  const bodyData = [
    {
      title: "ID: ",
      value: schedule ? schedule.id : "",
    },
    {
      title: "Nội dung:",
      value: schedule ? schedule.content : "",
    },
    {
      title: "Ngày:",
      value: schedule ? schedule.date : "",
    },
    {
      title: "Trạng thái:",
      value: schedule ? ((schedule.status) ?  "Làm việc" : "Nghỉ"): "",
    },
    {
      title: "Thời gian bắt đầu:",
      value: schedule ? schedule.timeStart : "",
    },
    {
      title: "Thời gian kết thúc:",
      value: schedule ? schedule.timeEnd : "",
    },
    {
      title: "Ngưởi tạo:  ",
      value: schedule ? schedule.createBy : "",
    },
    {
      title: "Người sửa",
      value: schedule ? schedule.updateBy : "",
    },

    {
      title: "Ngày tạo:",
      value: schedule ? schedule.createDate : "",
    },
    {
      title: "Ngày sửa:",
      value: schedule ? schedule.updateDate : "",
    },
    {
      title: "Xóa:",
      value: schedule ? ((schedule.isDelete) ? "Đã xóa" : "Chưa xóa") : "",
    },
  ];

  return (
    <div className="schedule-detail">
      <h2>Thông tin chi tiết lịch làm việc</h2>
      <div className="user-detail-container">
        {/* <div className="avatar">
          <img src={user.avt} alt="ảnh đại diện" />
        </div> */}
        <div className="list-field">
          {bodyData.map((item, index) => (
            <div key={index} className="field">
              <label>
                {" "}
                <i class="bx bxs-star"></i>
                {item.title}
              </label>
              <input type="text" value={item.value} readOnly />
            </div>
          ))}
          <div className="field" style={{ margin: "20px 0" }}>
            <i class="bx bxs-star"></i>
            <label>Đã xóa:</label>
            <img src="" alt="" />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default DetailSchedule;
