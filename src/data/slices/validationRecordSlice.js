/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getValidationProcesses, postValidationProcess } from '../api';
import { REQUEST_STATUS } from '../constants';

export const getAvailableValidationProcesses = createAsyncThunk('organization/validationProcesses', async () => {
  const response = await getValidationProcesses();
  return response;
});

export const createValidationProcess = createAsyncThunk('organization/validationProcesses/post', async (formData) => postValidationProcess(formData));

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
        loadStatus: REQUEST_STATUS.FAILED,
        data: [],
        error: action.error,
      };
    });
    builder.addCase(createValidationProcess.pending, (state) => {
      state.availableValidationProcesses = {
        ...state.availableValidationProcesses,
        loadStatus: REQUEST_STATUS.LOADING,
        data: [],
        error: {},
      };
    });
    builder.addCase(createValidationProcess.fulfilled, (state) => {
      // TODO: When the GET validationProcesses exists, solve this
      state.availableValidationProcesses = {
        ...state.availableValidationProcesses,
        loadStatus: REQUEST_STATUS.LOADED,
        error: {},
      };
    });
    builder.addCase(createValidationProcess.rejected, (state, action) => {
      state.availableValidationProcesses = {
        ...state.availableValidationProcesses,
        loadStatus: REQUEST_STATUS.FAILED,
        error: action.error,
      };
    });
  },
});

export const validationRecordReducer = validationRecordSlice.reducer;
