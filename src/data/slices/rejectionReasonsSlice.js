/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRejectionReasons } from '../api';
import { REQUEST_STATUS } from '../constants';

export const getAvailableRejectionReasons = createAsyncThunk('validationProcess/rejectionReasons', async () => {
  const response = await getRejectionReasons();
  return response;
});

const rejectionReasons = {
  loadStatus: 'idle',
  data: [],
  error: {},
};

export const rejectionReasonsSlice = createSlice({
  name: 'rejectionReasons',
  initialState: rejectionReasons,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAvailableRejectionReasons.pending, (state) => {
      state.loadStatus = REQUEST_STATUS.LOADING;
      state.data = [];
      state.error = {};
    });
    builder.addCase(getAvailableRejectionReasons.fulfilled, (state, action) => {
      state.loadStatus = REQUEST_STATUS.LOADED;
      state.data = action.payload;
      state.error = {};
    });
    builder.addCase(getAvailableRejectionReasons.rejected, (state, action) => {
      state.loadStatus = REQUEST_STATUS.FAILED;
      state.data = [];
      state.error = action.error;
    });
  },
});

export const rejectionReasonsReducer = rejectionReasonsSlice.reducer;
