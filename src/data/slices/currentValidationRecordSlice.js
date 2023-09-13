/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const currentValidationRecordInitialState = {
  loadStatus: null,
  courseName: null,
  courseId: null,
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
});

export const currentValidationRecordReducer = currentRecordSlice.reducer;
export const {
  updateCurrentValidationRecordStatus,
  setCurrentRecord,
  updateValidationEvents,
} = currentRecordSlice.actions;
