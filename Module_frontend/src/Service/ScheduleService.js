import axios from "axios";
import { Navigate } from "react-router-dom";
import  { jwtDecode }  from "jwt-decode";
import { getAllScheduleError, getAllScheduleSuccess, getAllScheduleStart } from "../redux/slices/ScheduleSlice";

const isTokenExpired = (token) => {
    if (!token) {
      return true; // Token doesn't exist
    }
  
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
  
    return decodedToken.exp < currentTime;
};
  
export const getAllSchedule = async (dispatch) => {
    dispatch(getAllScheduleStart());
    // console.log(accessToken)
    // if(!isTokenExpired(accessToken)){
        try {
            const res = await axios.get("http://localhost:8081/api/v1/schedule", {
                // headers: {
                //     // 'Authorization': `Bearer ${accessToken}`,
                //     'Content-Type': 'application/json'
                // }
            });
            console.log(res.data); // log cai res nay` t xem  alo ?
            dispatch(getAllScheduleSuccess(res.data))
        } catch (error) {
            dispatch(getAllScheduleError());
            // Navigate('/login')
        }
    // } else {
    //     console.log("Token không còn hiệu lực");
    // }
};