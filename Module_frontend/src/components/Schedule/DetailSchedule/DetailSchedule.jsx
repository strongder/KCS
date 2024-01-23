import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import "./DetailSchedule.scss";
import { fetchScheduleById } from "../../../services/ScheduleService";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const DetailSchedule = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { schedule, loading, error } = useSelector(
    (state) => state.schedule.getScheduleByID
  );
  useEffect(() => {
    fetchScheduleById(id, dispatch);
  }, []);

  const bodyData = [
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
      value: schedule ? (schedule.status ? "Làm việc" : "Nghỉ") : "",
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
      value: schedule ? (schedule.isDelete ? "Đã xóa" : "Chưa xóa") : "",
    },
  ];

  return (
    <>
      {!loading && (
        <div className="schedule-detail">
          <h2>Thông tin chi tiết lịch làm việc</h2>
          <div className="schedule-detail-container">
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
            </div>
          </div>
          <div className="cancel">
            <Link to="/admin/schedule">
              <button>Thoát</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailSchedule;
