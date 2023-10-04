import { configureStore } from '@reduxjs/toolkit';

import {
  coursesReducer,
  courseCategoriesReducer,
  organizationsReducer,
  validationBodiesReducer,
  validationRecordReducer,
  currentValidationRecordReducer,
  userInfoReducer,
  rejectionReasonsReducer,
  popUpMessageReducer,
} from './slices';

export const initializeStore = (preloadedState = undefined) => (
  configureStore({
    reducer: {
      courses: coursesReducer,
      courseCategories: courseCategoriesReducer,
      organizations: organizationsReducer,
      validationRecord: validationRecordReducer,
      validationBody: validationBodiesReducer,
      currentValidationRecord: currentValidationRecordReducer,
      userInfo: userInfoReducer,
      rejectionReasons: rejectionReasonsReducer,
      popUpMessage: popUpMessageReducer,
    },
    preloadedState,
  })
);

const store = initializeStore();

export default store;
