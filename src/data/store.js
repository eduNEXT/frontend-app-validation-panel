import { configureStore } from '@reduxjs/toolkit';
import {
  coursesSlice, validationRecordslice, validationBodySlice, courseCategorySlice, currentRecordSlice,
} from './slice';

export const initializeStore = (preloadedState = undefined) => (
  configureStore({
    reducer: {
      courses: coursesSlice.reducer,
      validationRecord: validationRecordslice.reducer,
      validationBody: validationBodySlice.reducer,
      courseCategory: courseCategorySlice.reducer,
      currentValidationRecord: currentRecordSlice.reducer,
    },
    preloadedState,
  })
);

const store = initializeStore();

export default store;
