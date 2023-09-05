/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getValidationBody } from '../api';
import { REQUEST_STATUS } from '../constants';

export const getAvailableValidationBodies = createAsyncThunk('organization/validationBodies', async () => {
  const response = getValidationBody();
  return response;
});

const validationBodiesInitialState = {
  availableValidationBodies: {
    loadStatus: 'idle',
    data: [],
    error: {},
  },
};

export const validationBodiesSlice = createSlice({
  name: 'validationBodies',
  initialState: validationBodiesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAvailableValidationBodies.pending, (state) => {
      state.availableValidationBodies = {
        loadStatus: REQUEST_STATUS.LOADING,
        data: [],
        error: {},
      };
    });
    builder.addCase(getAvailableValidationBodies.fulfilled, (state, action) => {
      state.availableValidationBodies = {
        loadStatus: REQUEST_STATUS.LOADED,
        data: action.payload,
        error: {},
      };
    });
    builder.addCase(getAvailableValidationBodies.rejected, (state, action) => {
      state.availableValidationBodies = {
        loadStatus: REQUEST_STATUS.LOADED,
        data: [],
        error: action.error,
      };
    });
  },
});

export const validationBodiesReducer = validationBodiesSlice.reducer;
