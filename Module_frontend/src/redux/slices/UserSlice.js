import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as userService from "../../services/userService";
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  return userService.fetchUsers();
});

export const fetchUserById = createAsyncThunk("user/fetchUserById", async (userId) => {
  return userService.fetchUserById(userId);
}
);
export const fetchCurrentUser = createAsyncThunk("user/fetchCurrentUser", async (userId) => {
  return userService.fetchCurrentUser(userId);
}
);

export const addUser = createAsyncThunk("user/addUser", async (userData) => {
  return userService.addUser(userData);
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (updatedUser) => {
    return userService.updateUser(updatedUser);
  }
);

export const removeUser = createAsyncThunk(
  "user/removeUser",
  async (userId) => {
    return userService.removeUser(userId);
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    user: {},
    currentUser:{},
    loading: false,
    error: null,
    searchData: [],
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // .addCase(addUser.pending, (state) => {
      //   state.loading = true;
      // })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(fetchUsers.pending, (state) => {
      //   state.loading = true;
      // })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        console.log(state)
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(fetchUserById.pending, (state) => {
      //   state.loading = true;
      // })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      // .addCase(updateUser.pending, (state) => {
      //   state.loading = true;
      // })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(removeUser.pending, (state) => {
      //   state.loading = true;
      //   console.log("fdsfds");
      // })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.loading = false;
        const userIndex = state.data.findIndex(
          (user) => user.id === action.payload.id
        );
        if (userIndex !== -1) {
          state.data[userIndex] = action.payload;
        }
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { searchUser } = userSlice.actions;
