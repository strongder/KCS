// // src/services/userService.js

// const API_URL = 'https://api.example.com/users';

// export const fetchUsers = async () => {
//   const response = await fetch(API_URL);
//   const data = await response.json();
//   return data;
// };

// export const addUser = async (userData) => {
//   const response = await fetch(API_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData),
//   });

//   const data = await response.json();
//   return data;
// };

// export const updateUser = async (userId, updatedUserData) => {
//   const response = await fetch(`${API_URL}/${userId}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(updatedUserData),
//   });

//   const data = await response.json();
//   return data;
// };

// export const removeUser = async (userId) => {
//   const response = await fetch(`${API_URL}/${userId}`, {
//     method: 'DELETE',
//   });

//   const data = await response.json();
//   return data;
// };
