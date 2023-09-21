import { configureStore } from '@reduxjs/toolkit';

import {
  coursesReducer,
  courseCategoriesReducer,
  validationBodiesReducer,
  validationRecordReducer,
  currentValidationRecordReducer,
  userInfoReducer,
} from './slices';

export const initializeStore = (preloadedState = undefined) => (
  configureStore({
    reducer: {
      courses: coursesReducer,
      courseCategories: courseCategoriesReducer,
      validationRecord: validationRecordReducer,
      validationBody: validationBodiesReducer,
      currentValidationRecord: currentValidationRecordReducer,
      userInfo: userInfoReducer,
    },
    preloadedState,
  })
);

const store = initializeStore();

export default store;
