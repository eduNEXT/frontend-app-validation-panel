/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getValidationProcesses } from '../api';
import { REQUEST_STATUS } from '../constants';

export const getAvailableValidationProcesses = createAsyncThunk('organization/validationProcesses', async () => {
  const response = getValidationProcesses();
  return response;
});

const validationProcessesInitialState = {
  availableValidationProcesses: {
    loadStatus: 'idle',
    data: [],
    error: {},
  },
};

export const validationRecordSlice = createSlice({
  name: 'validationProcesses',
  initialState: validationProcessesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAvailableValidationProcesses.pending, (state) => {
      state.availableValidationProcesses = {
        loadStatus: REQUEST_STATUS.LOADING,
        data: [],
        error: {},
      };
    });
    builder.addCase(getAvailableValidationProcesses.fulfilled, (state, action) => {
      state.availableValidationProcesses = {
        loadStatus: REQUEST_STATUS.LOADED,
        data: action.payload,
        error: {},
      };
    });
    builder.addCase(getAvailableValidationProcesses.rejected, (state, action) => {
      state.availableValidationProcesses = {
        loadStatus: REQUEST_STATUS.LOADED,
        data: [],
        error: action.error,
      };
    });
  },
});

export const validationRecordReducer = validationRecordSlice.reducer;
