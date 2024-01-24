import axios from "axios";
import axiosInstance from "../api";
import { getRoomPrivateByIDUsersError, getRoomPrivateByIDUsersStart, getRoomPrivateByIDUsersSuccess } from "../redux/slices/RoomPrivateSlice";

const API_URL = 'http://localhost:8081/api/v1/room-private';

export const fetchRoomPrivate = async (id1, id2, dispatch) => {
    dispatch(getRoomPrivateByIDUsersStart())
    try {
      const response = await axiosInstance.get(`${API_URL}/${id1}/${id2}`);
      console.log(response.data.id);
      dispatch(getRoomPrivateByIDUsersSuccess(response.data.id));
      return response.data.id;
    } catch (error) {
      console.error('Error fetching users:', error);
      dispatch(getRoomPrivateByIDUsersError());
    }
  };