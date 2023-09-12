/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCoursesByUser } from '../api';
import { REQUEST_STATUS } from '../constants';

export const getCoursesByUsername = createAsyncThunk('courses/availableUserCourses', async () => {
  const response = getCoursesByUser();
  return response;
});

const coursesInitialState = {
  availableUserCourses: {
    loadStatus: 'idle',
    data: [],
    error: {},
  },
};

export const coursesSlice = createSlice({
  name: 'courses',
  initialState: coursesInitialState,
  reducers: {
    setCourses: (state, { payload }) => {
      state.courses = payload.courses;
      state.loadStatus = payload.loadStatus;
    },
    updateCoursesStatus: (state, { payload }) => {
      state.loadStatus = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCoursesByUsername.pending, (state) => {
      state.availableUserCourses = {
        loadStatus: REQUEST_STATUS.LOADING,
        data: [],
        error: {},
      };
    });
    builder.addCase(getCoursesByUsername.fulfilled, (state, action) => {
      state.availableUserCourses = {
        loadStatus: REQUEST_STATUS.LOADED,
        data: action.payload,
        error: {},
      };
    });
    builder.addCase(getCoursesByUsername.rejected, (state, action) => {
      state.availableUserCourses = {
        loadStatus: REQUEST_STATUS.FAILED,
        data: [],
        error: action.error,
      };
    });
  },
});

export const coursesReducer = coursesSlice.reducer;
