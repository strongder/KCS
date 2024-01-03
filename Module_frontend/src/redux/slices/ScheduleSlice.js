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
    },
    create: {
      schedule: null,
      isFetching: false,
      error: null
    },
    delete: {
      schedule: null,
      isFetching: false,
      error: null
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
    },
    createScheduleStart: (state) => {
      state.create.isFetching = true;
    },
    createScheduleSuccess: (state, action) => {
      state.create.isFetching = false;
      state.create.schedule = action.payload;
      state.create.error = false
    },
    createScheduleError: (state) => {
      state.create.isFetching = false;
      state.create.error = true
    },
    deleteScheduleStart: (state) => {
      state.delete.isFetching = true;
    },
    deleteScheduleSuccess: (state, action) => {
      state.delete.isFetching = true;
      state.delete.schedule = action.payload;
      state.delete.error = false;
    },
    deleteScheduleError: (state) => {
      state.delete.isFetching = false;
      state.delete.error = true;
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
  updateScheduleStart,
  createScheduleError,
  createScheduleStart,
  createScheduleSuccess,
  deleteScheduleStart,
  deleteScheduleSuccess,
  deleteScheduleError
} = ScheduleSlice.actions;

export default ScheduleSlice.reducer;
// export const {fetchSchedules} = userSlice.actions;
