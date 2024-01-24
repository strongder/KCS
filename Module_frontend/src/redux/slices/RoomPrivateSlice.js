import { createSlice } from "@reduxjs/toolkit";

const RoomPrivateSlice = createSlice({
    name: "RoomPrivate",
    initialState: {
        getRoomPrivateByIDUsers: {
            RoomPrivateID: null,
            isFetching: false,
            error: null,
        }
    },
    reducers: {
        getRoomPrivateByIDUsersStart: (state) => {
            state.getRoomPrivateByIDUsers.isFetching = true;
        },
        getRoomPrivateByIDUsersSuccess: (state, action) => {
            state.getRoomPrivateByIDUsers.isFetching = false;
            state.getRoomPrivateByIDUsers.RoomPrivateID = action.payload;
            state.getRoomPrivateByIDUsers.error = false;
        },
        getRoomPrivateByIDUsersError: (state) => {
            state.getRoomPrivateByIDUsers.isFetching = false;
            state.getRoomPrivateByIDUsers.error = true;
        }
    },
});

export const {
    getRoomPrivateByIDUsersStart,
    getRoomPrivateByIDUsersSuccess,
    getRoomPrivateByIDUsersError,
} = RoomPrivateSlice.actions;

export default RoomPrivateSlice.reducer;
// export const {fetchSchedules} = userSlice.actions;
