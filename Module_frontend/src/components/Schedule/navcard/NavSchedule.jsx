import React, { useState } from "react";
import "./NavSchedule.scss"
import DialogAdd from "../../dialogAdd/DialogAdd";
import { addSchedule } from "../../../services/ScheduleService";
import { fetchSchedule } from "../../../services/ScheduleService";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

const NavCard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({
    content: "",
    date: "",
    timeStart: "",
    timeEnd: "",
    status: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validateForm = () => {
    const { content, date, timeStart, timeEnd, status } = formData;

    // Check if any field is empty
    if (!content || !date || !timeStart || !timeEnd) {
      return false;
    }

    return true;
  };
  const handleSubscribe = async () => {
    // if (validateForm()) {
    if (validateForm()) {
      const schedule = { ...formData };
      schedule.date = schedule.date + " 00:00:00"
      schedule.timeStart = schedule.date + " " + schedule.timeStart;
      schedule.timeEnd = schedule.date + " " + schedule.timeEnd;
      // delete user.confirmPassword;
      console.log(schedule);
      await addSchedule(schedule, dispatch);
      await fetchSchedule(dispatch);
    }
  }
  const bodyData = [
    {
      title: "Ngày:",
      value: (
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
      ),
    },
    {
      title: "Nội dung:",
      value: (
        <input
          type="text"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          required
        />
      ),
    },
    {
      title: "Thời gian bắt đầu:",
      value: (
        <input
          type="text"
          name="timeStart"
          value={formData.timeStart}
          onChange={handleInputChange}
          required
        />
      ),
    },
    {
      title: "Thời gian kết thúc:",
      value: (
        <input
          type="test"
          name="timeEnd"
          value={formData.timeEnd}
          onChange={handleInputChange}
          required
        />
      ),
    },
    {
      title: "Trạng thái:",
      value: (
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        >
          <option value={false}>Nghỉ</option>
          <option value={true}>Làm việc</option>
        </select>
      )
    }
  ];

  return (
    <div className="nav-card">
      <div className="row">
        <div className="col-4" style={{ margin: "auto" }}>
          <DialogAdd
            nameButton="Thêm lịch làm việc"
            title="Thêm lịch làm việc"
            bodyData={bodyData}
            handleInputChange={handleInputChange}
            handleSubscribe={handleSubscribe}
          />
        </div>
        <div style={{ margin: "auto" }} className="col-6">
          <div className="nav-search">
            <input type="text" />
            <i class="bx bx-search-alt-2"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavCard;
