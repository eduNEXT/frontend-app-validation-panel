import { configureStore } from '@reduxjs/toolkit';
import {
  courseCategorySlice, currentRecordSlice,
} from './slice';

import {
  coursesReducer, courseCategoriesReducer, validationBodiesReducer, validationRecordReducer,
} from './slices';

export const initializeStore = (preloadedState = undefined) => (
  configureStore({
    reducer: {
      courses: coursesReducer,
      courseCategories: courseCategoriesReducer,
      validationRecord: validationRecordReducer,
      validationBody: validationBodiesReducer,
      courseCategory: courseCategorySlice.reducer,
      currentValidationRecord: currentRecordSlice.reducer,
    },
    preloadedState,
  })
);

const store = initializeStore();

export default store;
