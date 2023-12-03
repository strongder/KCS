import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = () =>
  axios.get(API_URL).
  then(response => response.data);

export const fetchUserById = (userId) =>
  axios.get(`${API_URL}/${userId}`)
  .then(response => response.data);

export const addUser = (userData) =>
  axios.post(API_URL, userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.data);

export const updateUser = (updatedUser) =>
  axios.put(`${API_URL}/update/${updatedUser.id}`, updatedUser, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.data);

export const removeUser = (userId) =>
  axios.delete(`${API_URL}/delete/${userId}`,{
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.data);
