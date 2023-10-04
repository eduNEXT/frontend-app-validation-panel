/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrganizations } from '../api';
import { REQUEST_STATUS } from '../constants';

export const getAvailableOrganizations = createAsyncThunk('organizations/availableOrganizations', async () => {
  const response = await getOrganizations();
  return response.results;
});

const organizationsInitialState = {
  availableOrganizations: {
    loadStatus: 'idle',
    data: [],
    error: {},
  },
};

export const organizationsSlice = createSlice({
  name: 'organizations',
  initialState: organizationsInitialState,
  reducers: {
    setorganizations: (state, { payload }) => {
      state.organizations = payload.organizations;
      state.loadStatus = payload.loadStatus;
    },
    updateorganizationsStatus: (state, { payload }) => {
      state.loadStatus = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAvailableOrganizations.pending, (state) => {
      state.availableOrganizations = {
        loadStatus: REQUEST_STATUS.LOADING,
        data: [],
        error: {},
      };
    });
    builder.addCase(getAvailableOrganizations.fulfilled, (state, action) => {
      state.availableOrganizations = {
        loadStatus: REQUEST_STATUS.LOADED,
        data: action.payload,
        error: {},
      };
    });
    builder.addCase(getAvailableOrganizations.rejected, (state, action) => {
      state.availableOrganizations = {
        loadStatus: REQUEST_STATUS.FAILED,
        data: [],
        error: action.error,
      };
    });
  },
});

export const organizationsReducer = organizationsSlice.reducer;
