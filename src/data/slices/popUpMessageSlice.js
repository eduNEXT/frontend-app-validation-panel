/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const popUpMessageInitialState = {
  variant: null,
  message: '',
};

export const popUpMessageSlice = createSlice({
  name: 'userInfo',
  initialState: popUpMessageInitialState,
  reducers: {
    setPopUpMessage: (state, action) => {
      state.variant = action.payload.variant;
      state.message = action.payload.message;
    },
    resetPopUpMessage: (state) => {
      state.variant = null;
      state.message = '';
    },
  },
});

export const popUpMessageReducer = popUpMessageSlice.reducer;
export const {
  setPopUpMessage,
  resetPopUpMessage,
} = popUpMessageSlice.actions;
