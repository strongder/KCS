import axiosInstance from "../api";

const   API_URL = "http://localhost:8081/api/v1/room-private"
export const getRoomByUser= async (id1, id2) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/${id1}/${id2}`)
       console.log("check data:" ,response.data.id)
        return response.data.id;
    } catch (error) {
        console.error(`Error fetching user with I:`, error);
        throw error;
    }
};