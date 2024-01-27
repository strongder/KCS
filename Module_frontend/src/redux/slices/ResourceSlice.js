import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as resourceService from '../../services/ResourceService';

// Define một asynchronous thunk để lấy tất cả các tệp tin
export const fetchAllFile = createAsyncThunk('file/fetchAllFile', async () => {
  const files = await resourceService.getAllFile();
  return files;
});
export const fetchAllFileByRoom = createAsyncThunk('file/fetchAllFileByRoom', async (roomId) => {
  const files = await resourceService.getAllFileByRoom(roomId);
  return files;
});
// Define một asynchronous thunk để lấy một tệp tin dựa trên ID
export const fetchFileById = createAsyncThunk('file/fetchFileById', async (fileId) => {
  const file = await resourceService.getFileById(fileId);
  return file;
});

export const fetchFileByUsername = createAsyncThunk('file/fetchFileByUsername', async (username) => {
    const file = await resourceService.getFileByUsername(username);
    return file;
  });

// Define một asynchronous thunk để thêm một tệp tin mới
export const addNewFile = createAsyncThunk('file/addNewFile', async ({ roomID, userId, file }) => {
  const newFile = await resourceService.addFile(roomID, userId, file);
  return newFile;
});

// Define một asynchronous thunk để tải về một tệp tin
export const downloadFileThunk = createAsyncThunk('file/downloadFile', async (fileId) => {
  await resourceService.downloadFile(fileId);
});



const ResouceSlice = createSlice({
    name: 'file',
    initialState: {
      files: [],
      avatarCurrent: null,
      avatar:null,
      loading: false, 
      error: null,    
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        // .addCase(fetchAllFile.pending, (state) => {
        //   state.loading = true;
        //   state.error = null;
        // })
        .addCase(fetchAllFileByRoom.fulfilled, (state, action) => {
          state.loading = false;
          state.files = action.payload;
        })
        .addCase(fetchAllFileByRoom.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        
        .addCase(fetchAllFile.fulfilled, (state, action) => {
          state.loading = false;
          state.files = action.payload;
        })
        .addCase(fetchAllFile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })

        .addCase(fetchFileByUsername.fulfilled, (state, action) => {
            state.loading = false;
            state.avatarCurrent = action.payload;
          })
          .addCase(fetchFileByUsername.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
        .addCase(fetchFileById.fulfilled, (state, action) => {
          state.loading = false;
          state.avatar = action.payload;
        })
        .addCase(fetchFileById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        // .addCase(addNewFile.pending, (state) => {
        //   state.loading = true;
        //   state.error = null;
        // })
        .addCase(addNewFile.fulfilled, (state, action) => {
          state.loading = false;
          state.files.push(action.payload);
        })
        .addCase(addNewFile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default ResouceSlice.reducer;