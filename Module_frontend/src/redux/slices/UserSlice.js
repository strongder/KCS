import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as userService from '../services/userService';


export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  return userService.fetchUsers();
});

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (userId) => {
  return userService.fetchUserById(userId);
});

export const addUser = createAsyncThunk('user/addUser', async (userData) => {
  return userService.addUser(userData);
});

export const updateUser = createAsyncThunk('user/updateUser', async (updatedUser) => {
  console.log("+++++++++", updatedUser)
  return userService.updateUser(updatedUser);
});

export const removeUser = createAsyncThunk('user/removeUser', async (userId) => {
  return userService.removeUser(userId);
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    user: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading =  true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading =  true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user= action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user= action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(removeUser.pending, (state) => {
        state.loading =  true;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user= action.payload;
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
// export const {fetchUsers} = userSlice.actions;
