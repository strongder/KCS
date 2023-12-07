import { createSlice } from "@reduxjs/toolkit";

const ScheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    allSchedule: {
      data: [],
      // schedule: null,
      isFetching: false,
      error: null,
    },
    getScheduleByID: {
      schedule: null,
      isFetching: false,
      error: null,
    },
    update: {
      schedule: null,
      isFetching: false,
      error: null,
    }
  },
  reducers: {
    getAllScheduleStart: (state) => {
      state.allSchedule.isFetching = true;
    },
    getAllScheduleSuccess: (state, action) => {
      state.allSchedule.isFetching = false;
      state.allSchedule.data = action.payload;
      state.allSchedule.error = false
    },
    getAllScheduleError: (state) => {
      state.allSchedule.isFetching = false;
      state.allSchedule.error = true;
    },
    getScheduleByIDStart: (state) => {
      state.getScheduleByID.isFetching = true;
    },
    getScheduleByIDSuccess: (state, action) => {
      state.getScheduleByID.isFetching = false;
      state.getScheduleByID.schedule = action.payload;
      state.getScheduleByID.error = false;
    },
    getScheduleByIDError: (state) => {
      state.getScheduleByID.isFetching = false;
      state.getScheduleByID.error = true;
    },
    updateScheduleStart: (state) => {
      state.update.isFetching = true;
    },
    updateScheduleSusscess: (state, action) => {
      state.update.isFetching = false;
      state.update.schedule = action.payload;
      state.update.error = false;
    },
    updateScheduleError: (state) => {
      state.update.isFetching = false;
      state.update.error = true;
    }
  },
});

export const {
  getAllScheduleStart,
  getAllScheduleError,
  getAllScheduleSuccess,
  getScheduleByIDStart,
  getScheduleByIDSuccess,
  getScheduleByIDError,
  updateScheduleSusscess,
  updateScheduleError,
  updateScheduleStart
} = ScheduleSlice.actions;

export default ScheduleSlice.reducer;
// export const {fetchSchedules} = userSlice.actions;
