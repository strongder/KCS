import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllFile, addFile, getFileByUsername, downloadFile, getFileById } from '../../services/ResourceService';

// Define một asynchronous thunk để lấy tất cả các tệp tin
export const fetchAllFile = createAsyncThunk('file/fetchAllFile', async () => {
  const files = await getAllFile();
  return files;
});

// Define một asynchronous thunk để lấy một tệp tin dựa trên ID
export const fetchFileById = createAsyncThunk('file/fetchFileById', async (fileId) => {
  const file = await getFileById(fileId);
  return file;
});

export const fetchFileByUsername = createAsyncThunk('file/fetchFileByUsername', async (username) => {
    const file = await getFileByUsername(username);
    return file;
  });

// Define một asynchronous thunk để thêm một tệp tin mới
export const addNewFile = createAsyncThunk('file/addNewFile', async ({ userId, file }) => {
  const newFile = await addFile(userId, file);
  return newFile;
});

// Define một asynchronous thunk để tải về một tệp tin
export const downloadFileThunk = createAsyncThunk('file/downloadFile', async (fileId) => {
  await downloadFile(fileId);
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