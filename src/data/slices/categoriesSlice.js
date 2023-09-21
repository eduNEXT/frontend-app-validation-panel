/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories } from '../api';
import { REQUEST_STATUS } from '../constants';

export const getCourseCategories = createAsyncThunk('courses/courseCategories', async () => {
  const response = await getCategories();
  return response;
});

const courseCategoriesInitialState = {
  availableCourseCategories: {
    loadStatus: 'idle',
    data: [],
    error: {},
  },
};

export const courseCategoriesSlice = createSlice({
  name: 'categories',
  initialState: courseCategoriesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCourseCategories.pending, (state) => {
      state.availableCourseCategories = {
        loadStatus: REQUEST_STATUS.LOADING,
        data: [],
        error: {},
      };
    });
    builder.addCase(getCourseCategories.fulfilled, (state, action) => {
      state.availableCourseCategories = {
        loadStatus: REQUEST_STATUS.LOADED,
        data: action.payload,
        error: {},
      };
    });
    builder.addCase(getCourseCategories.rejected, (state, action) => {
      state.availableCourseCategories = {
        loadStatus: REQUEST_STATUS.FAILED,
        data: [],
        error: action.error,
      };
    });
  },
});

export const courseCategoriesReducer = courseCategoriesSlice.reducer;
