/* eslint-disable no-param-reassign */
import { camelCaseObject } from '@edx/frontend-platform';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getValidationProcess } from '../api';
import { REQUEST_STATUS } from '../constants';

export const getCurrentValidationProcessByCourseId = createAsyncThunk(
  'organization/validationProcesses/selected',
  async (courseId) => {
    const response = await getValidationProcess(courseId);
    return response;
  },
);

const currentValidationRecordInitialState = {
  loadStatus: 'idle',
  error: null,
  courseName: null,
  courseId: null,
  currentValidationUser: null,
  organization: null,
  categories: [],
  validationBody: null,
  validationProcessEvents: [],
};

const currentRecordSlice = createSlice({
  name: 'currentValidationRecord',
  initialState: currentValidationRecordInitialState,
  reducers: {
    updateCurrentValidationRecordStatus: (state, { payload }) => {
      state.loadStatus = payload;
    },
    setCurrentRecord: (state, { payload }) => {
      state.courseName = payload.courseName;
      state.courseId = payload.courseId;
      state.currentValidationUser = payload.currentValidationUser;
      state.organization = payload.organization;
      state.categories = payload.categories;
      state.validationBody = payload.validationBody;
      state.validationProcessEvents = payload.validationProcessEvents;
      state.loadStatus = payload.loadStatus;
    },
    updateValidationEvents: (state, { payload }) => {
      state.validationProcessEvents = payload.validationProcessEvents;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentValidationProcessByCourseId.pending, (state) => {
      state.loadStatus = REQUEST_STATUS.LOADING;
      state.error = null;
      state.courseName = null;
      state.courseId = null;
      state.currentValidationUser = null;
      state.organization = null;
      state.categories = null;
      state.validationBody = null;
      state.validationProcessEvents = null;
    });
    builder.addCase(getCurrentValidationProcessByCourseId.fulfilled, (state, action) => {
      state.loadStatus = REQUEST_STATUS.LOADED;
      state.error = null;
      state.courseName = action.payload.course.name;
      state.courseId = action.payload.course.id;
      state.currentValidationUser = action.payload.currentValidationUser;
      state.organization = action.payload.organization;
      state.categories = action.payload.categories;
      state.validationBody = action.payload.validationBody.name;
      // Is adapted the property createdAt 'cause backend send it as createAt
      state.validationProcessEvents = camelCaseObject(action.payload.events).map((event) => ({
        ...event,
        createdAt: event.createAt ?? event.createdAt,
      }));
    });
    builder.addCase(getCurrentValidationProcessByCourseId.rejected, (state, action) => {
      state.loadStatus = REQUEST_STATUS.FAILED;
      state.error = action.error;
      state.courseName = null;
      state.courseId = null;
      state.currentValidationUser = null;
      state.organization = null;
      state.categories = null;
      state.validationBody = null;
      state.validationProcessEvents = null;
    });
  },
});

export const currentValidationRecordReducer = currentRecordSlice.reducer;
export const {
  updateCurrentValidationRecordStatus,
  setCurrentRecord,
  updateValidationEvents,
} = currentRecordSlice.actions;
