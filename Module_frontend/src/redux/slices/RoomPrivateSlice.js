import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as roomPrivateService from '../../services/RoomPrivateService';

export const getRoomByUser = createAsyncThunk("roomPrivate/getRoomByUser", async (id1, id2) => {
    return roomPrivateService.getRoomByUser(id1, id2);
  });

const RoomPrivateSlice = createSlice({
    name: "roomPrivate",
    initialState: {
      roomId: '',
      loading: false,
      error: null,
    },
    reducers: {
    
    },
    extraReducers: (builder) => {
      builder
        .addCase(getRoomByUser.fulfilled, (state, action) => {
          state.loading = false;
          state.roomId = action.payload;
        })
        .addCase(getRoomByUser.rejected, (state, action) => {
          state.loading = true;
          state.error = action.error.message;
        })
        
    },
  });
  
  export default RoomPrivateSlice.reducer;