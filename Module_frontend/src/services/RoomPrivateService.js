import axios from "axios";

const API_URL = 'http://localhost:8081/api/v1/room-private';

export const fetchRoomPrivate = async (id1, id2) => {
    // dispatch(getAllScheduleStart())
    try {
      const response = await axiosInstance.get(`${API_URL}/${id1}/${id2}`);
      console.log(response.data);
      return response.data;
    //   dispatch(getAllScheduleSuccess(response.data));
    } catch (error) {
      console.error('Error fetching users:', error);
    //   dispatch(getAllScheduleError());
    }
  };