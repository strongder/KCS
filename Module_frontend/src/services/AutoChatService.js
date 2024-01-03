import axios from "axios";

const API_URL = "http://localhost:8081/api/v1/auto-chat";

export const getAllChat = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching autoChat:", error);
    throw error;
  }
};

export const getChatById = async (ChatId) => {
  try {
    const response = await axios.get(`${API_URL}/${ChatId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${ChatId}:`, error);
    throw error;
  }
};

export const addChat = async (autoChat) => {
  try {
    const response = await axios.post(`${API_URL}/create`, autoChat, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding autoChat:", error);
    throw error;
  }
};

export const updateChat = async (autoChat) => {
  try {
    const response = await axios.put(
      `${API_URL}/update/${autoChat.id}`,
      autoChat,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating autchat with ID ${autoChat.id} :`,error
    );
    throw error;
  }
};

export const removeChat = async (chatId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${chatId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error removing autoChat with ID ${chatId}:`, error);
    throw error;
  }
};
