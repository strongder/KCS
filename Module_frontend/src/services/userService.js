import axios from "axios";

const API_URL = "http://localhost:8081/api/v1/user";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
};

export const addUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const updateUser = async (updatedUser) => {
  try {
    const response = await axios.put(
      `${API_URL}/update/${updatedUser.id}`,
      updatedUser,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating user with ID ${updatedUser.id} :`,
      updatedUser,
      error
    );
    throw error;
  }
};

export const removeUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error removing user with ID ${userId}:`, error);
    throw error;
  }
};
