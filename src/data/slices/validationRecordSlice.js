/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllValidationProcesses, postValidationProcess } from '../api';
import { REQUEST_STATUS } from '../constants';

const transformValidationProcess = (validationProcess) => ({
  courseName: validationProcess.course.displayName || '',
  courseId: validationProcess.course.id,
  organization: validationProcess.organization?.name || '',
  categories: validationProcess.categories.map((category) => category?.name),
  validationBody: validationProcess.validationBody?.name || '',
  validationProcessEvents: validationProcess.events.map((event) => ({
    status: event.status,
    createdAt: event.createdAt,
    reason: event.reason,
    comment: event.comment,
    user: event.user?.fullName || '',
  })),
});

export const getAvailableValidationProcesses = createAsyncThunk('organization/validationProcesses', async () => {
  const response = await getAllValidationProcesses();
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
    builder
      .addCase(getAvailableValidationProcesses.pending, (state) => {
        state.availableValidationProcesses.loadStatus = REQUEST_STATUS.LOADING;
      })
      .addCase(getAvailableValidationProcesses.fulfilled, (state, action) => {
        state.availableValidationProcesses.loadStatus = REQUEST_STATUS.LOADED;
        state.availableValidationProcesses.data = action.payload.map(transformValidationProcess);
      })
      .addCase(getAvailableValidationProcesses.rejected, (state, action) => {
        state.availableValidationProcesses.loadStatus = REQUEST_STATUS.FAILED;
        state.availableValidationProcesses.error = action.error;
      })
      .addCase(createValidationProcess.pending, (state) => {
        state.availableValidationProcesses.loadStatus = REQUEST_STATUS.LOADING;
      })
      .addCase(createValidationProcess.fulfilled, (state, action) => {
        state.availableValidationProcesses.loadStatus = REQUEST_STATUS.SAVED;
        state.availableValidationProcesses.data.push(transformValidationProcess(action.payload));
      })
      .addCase(createValidationProcess.rejected, (state, action) => {
        state.availableValidationProcesses.loadStatus = REQUEST_STATUS.FAILED;
        state.availableValidationProcesses.error = action.error;
      });
  },
});

export const validationRecordReducer = validationRecordSlice.reducer;
