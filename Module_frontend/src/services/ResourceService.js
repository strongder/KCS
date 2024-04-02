import axios from "axios";
import axiosInstance from "../api";

const API_URL = "http://localhost:8081/api/v1/file";

export const getAllFile = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching autoChat:", error);
    throw error;
  }
};

export const getFileById = async (fileId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${fileId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${fileId}:`, error);
    throw error;
  }
};

export const getFileByUsername = async (username) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${username}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${username}:`, error);
    throw error;
  }
};

export const addFile = async (roomID, userId, file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axiosInstance.post(
      `${API_URL}/upload/${roomID}/${userId}`,
      file,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding file:", error);
    throw error;
  }
};

// Hàm để tải về tệp tin từ API
export const downloadFile = async (fileId) => {
  try {
    const response = await axios.get(`${API_URL}/download/${fileId}`, {
      responseType: "blob", // Chú ý responseType là 'blob' để xử lý dữ liệu nhị phân (tệp tin)
    });

    // Tạo một đường link ảo để tải về tệp tin
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Tạo một thẻ a để kích thước tải về tệp tin
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileId}.png`);
    document.body.appendChild(link);

    // Kích thước thẻ a để tải về tệp tin
    link.click();

    // Xóa đường link ảo
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
};
