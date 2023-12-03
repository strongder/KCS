// import { createSlice } from "@reduxjs/toolkit"

// const ScheduleSlice = createSlice({
//     name: 'schedule',
//     initialState: {
//         schedule: {
//             allTime: null,
//             isFetching: false,
//             error: false
//         }
//     },
//     reducers: {
//         getAllScheduleStart: (state) => {
//             state.schedule.isFetching = true;
//         },
//         getAllScheduleSuccess: (state, action) => {
//             state.schedule.isFetching = false;
//             state.schedule.allTime = action.payload;
//             state.schedule.error = false
//         },
//         getAllScheduleError: (state) => {
//             state.schedule.isFetching = false;
//             state.schedule.error = true;
//         }
//     }
// })

// export const {
//     getAllScheduleStart,
//     getAllScheduleSuccess,
//     getAllScheduleError
// } = ScheduleSlice.actions;

// export default ScheduleSlice.reducer;   
