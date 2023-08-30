/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    loadStatus: null,
  },
  reducers: {
    setCourses: (state, { payload }) => {
      state.courses = payload.courses;
      state.loadStatus = payload.loadStatus;
    },
    updateCoursesStatus: (state, { payload }) => {
      state.loadStatus = payload;
    },
  },
});

export const { setCourses, updateCoursesStatus } = coursesSlice.actions;

export const validationRecordslice = createSlice({
  name: 'validationRecord',
  initialState: {
    validationRecords: [],
    loadStatus: null,
  },
  reducers: {
    updateValidationRecordStatus: (state, { payload }) => {
      state.loadStatus = payload;
    },
    setValidationRecords: (state, { payload }) => {
      state.validationRecords = payload.validationRecords;
      state.loadStatus = payload.loadStatus;
    },
  },
});

export const { updateValidationRecordStatus, setValidationRecords } = validationRecordslice.actions;

export const validationBodySlice = createSlice({
  name: 'validationBody',
  initialState: {
    validationBodies: [],
    loadStatus: null,

  },
  reducers: {
    updateValidationBodyStatus: (state, { payload }) => {
      state.loadStatus = payload;
    },
    setValidationBodyList: (state, { payload }) => {
      state.validationBodies = payload.validationBody;
      state.loadStatus = payload.loadStatus;
    },
  },
});

export const { updateValidationBodyStatus, setValidationBodyList } = validationBodySlice.actions;

export const courseCategorySlice = createSlice({
  name: 'courseCategory',
  initialState: {
    courseCategories: [],
    loadStatus: null,
  },
  reducers: {
    updateCourseCatagoryStatus: (state, { payload }) => {
      state.loadStatus = payload;
    },

  },
  setCourseCategoryList: (state, { payload }) => {
    state.courseCategories = payload.categories;
    state.loadStatus = payload.loadStatus;
  },
});

export const {
  updateCourseCatagoryStatus,
  setCourseCategoryList,
} = courseCategorySlice.actions;

export const currentRecordSlice = createSlice({
  name: 'currentValidationRecord',
  initialState: {
    loadStatus: null,
    courseName: null,
    courseId: null,
    organization: null,
    categories: [],
    validationBody: null,
    validationProcessEvents: [],
  },
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
      state.validationProcessEvents = payload.processEvents;
      state.loadStatus = payload.loadStatus;
    },
    updateValidationEvents: (state, { payload }) => {
      state.validationProcessEvents = payload.validationProcessEvents;
    },
  },
});

export const {
  updateCurrentValidationRecordStatus,
  setCurrentRecord,
  updateValidationEvents,
} = currentRecordSlice.actions;
