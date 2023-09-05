/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const currentValidationRecordInitialState = {
  loadStatus: null,
  course_name: null,
  course_id: null,
  organization: null,
  categories: [],
  validation_body: null,
  validation_process_events: [],
};

const currentRecordSlice = createSlice({
  name: 'currentValidationRecord',
  initialState: currentValidationRecordInitialState,
  reducers: {
    updateCurrentValidationRecordStatus: (state, { payload }) => {
      state.loadStatus = payload;
    },
    setCurrentRecord: (state, { payload }) => {
      state.course_name = payload.course_name;
      state.course_id = payload.course_id;
      state.organization = payload.organization;
      state.categories = payload.categories;
      state.validation_body = payload.validation_body;
      state.validation_process_events = payload.validation_process_events;
      state.loadStatus = payload.loadStatus;
    },
    updateValidationEvents: (state, { payload }) => {
      state.validation_process_events = payload.validation_process_events;
    },
  },
});

export const currentValidationRecordReducer = currentRecordSlice.reducer;
export const {
  updateCurrentValidationRecordStatus,
  setCurrentRecord,
  updateValidationEvents,
} = currentRecordSlice.actions;
