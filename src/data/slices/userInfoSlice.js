/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../api';
import { REQUEST_STATUS } from '../constants';

export const getCurrentUserInfo = createAsyncThunk('user/userInfo', async () => {
  const response = await getUserInfo();
  return response;
});

const userInfoInitialState = {
  userInfo: {
    loadStatus: 'idle',
    isValidator: false,
  },
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: userInfoInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentUserInfo.pending, (state) => {
      state.userInfo = {
        loadStatus: REQUEST_STATUS.LOADING,
        isValidator: false,
        error: {},
      };
    });
    builder.addCase(getCurrentUserInfo.fulfilled, (state, action) => {
      state.userInfo = {
        loadStatus: REQUEST_STATUS.LOADED,
        isValidator: action.payload.isValidator,
        error: {},
      };
    });
    builder.addCase(getCurrentUserInfo.rejected, (state, action) => {
      state.userInfo = {
        loadStatus: REQUEST_STATUS.FAILED,
        isValidator: false,
        error: action.error,
      };
    });
  },
});

export const userInfoReducer = userInfoSlice.reducer;
