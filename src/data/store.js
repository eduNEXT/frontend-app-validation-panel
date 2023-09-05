import { configureStore } from '@reduxjs/toolkit';
import {
  validationRecordslice, courseCategorySlice, currentRecordSlice,
} from './slice';

import { coursesReducer, courseCategoriesReducer, validationBodiesReducer } from './slices';

export const initializeStore = (preloadedState = undefined) => (
  configureStore({
    reducer: {
      courses: coursesReducer,
      courseCategories: courseCategoriesReducer,
      validationRecord: validationRecordslice.reducer,
      validationBody: validationBodiesReducer,
      courseCategory: courseCategorySlice.reducer,
      currentValidationRecord: currentRecordSlice.reducer,
    },
    preloadedState,
  })
);

const store = initializeStore();

export default store;
