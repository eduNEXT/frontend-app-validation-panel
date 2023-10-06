/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { getAllValidationProcesses, postUpdateValidationProcessStatus, postValidationProcess } from '../api';
import { REQUEST_STATUS, VALIDATION_STATUS } from '../constants';

/** Helpers */
const transformValidationProcessEvents = (event) => ({
  status: event.status,
  createdAt: event.createdAt,
  reason: event.reason,
  comment: event.comment,
  user: event.user?.fullName || event.user?.username || '',
});

const transformValidationProcess = (validationProcess) => ({
  courseName: validationProcess.course.displayName || '',
  courseId: validationProcess.course.id,
  organization: validationProcess.organization?.name,
  categories: validationProcess.categories.map((category) => category?.name),
  validationBody: validationProcess.validationBody?.name,
  currentValidationUser: validationProcess.currentValidationUser,
  validationProcessEvents: validationProcess.events.map(transformValidationProcessEvents),
});

const defaultCommentsForFastActions = {
  cncl: 'Validation process cancelled',
  subm: 'Validation process re-submitted',
  revi: 'Validation process was selected to be reviewed',
};

/** Thunks */
export const getAvailableValidationProcesses = createAsyncThunk('organization/validationProcesses', async () => {
  const response = await getAllValidationProcesses();
  return response;
});

export const updateValidationProcessStatus = createAsyncThunk('organization/validationProcess/updateStatus', async (formData) => postUpdateValidationProcessStatus(
  {
    ...formData,
    comment: formData.comment ?? defaultCommentsForFastActions[formData.status],
  },
));

export const createValidationProcess = createAsyncThunk('organization/validationProcesses/post', async (formData) => postValidationProcess({
  ...formData,
  // Sent like an array because backend needs it like that
  // if category as array, this would be unnecessary
  categoryIds: [formData.categoryId],
}));

/** Slice */
const validationProcessesInitialState = {
  availableValidationProcesses: {
    loadStatus: 'idle',
    courseIdsCurrentUserIsReviewing: [],
    data: [],
    error: {},
  },
};

export const validationRecordSlice = createSlice({
  name: 'validationProcesses',
  initialState: validationProcessesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAvailableValidationProcesses.pending, (state) => {
        state.availableValidationProcesses.loadStatus = REQUEST_STATUS.LOADING;
      })
      .addCase(getAvailableValidationProcesses.fulfilled, (state, action) => {
        const { userId } = getAuthenticatedUser();

        state.availableValidationProcesses.courseIdsCurrentUserIsReviewing = action.payload.filter(
          (course) => course.currentValidationUser?.id === userId,
        ).map((course) => course.course.id);
        state.availableValidationProcesses.loadStatus = REQUEST_STATUS.LOADED;
        state.availableValidationProcesses.data = action.payload.map(transformValidationProcess);
      })
      .addCase(getAvailableValidationProcesses.rejected, (state, action) => {
        state.availableValidationProcesses.loadStatus = REQUEST_STATUS.FAILED;
        state.availableValidationProcesses.error = action.error;
      })
      .addCase(createValidationProcess.pending, (state) => {
        state.availableValidationProcesses.loadStatus = REQUEST_STATUS.LOADING;
      })
      .addCase(createValidationProcess.fulfilled, (state, action) => {
        state.availableValidationProcesses.loadStatus = REQUEST_STATUS.SAVED;
        state.availableValidationProcesses.data.push(transformValidationProcess(action.payload));
      })
      .addCase(createValidationProcess.rejected, (state, action) => {
        state.availableValidationProcesses.loadStatus = REQUEST_STATUS.FAILED;
        state.availableValidationProcesses.error = action.error;
      })
      .addCase(updateValidationProcessStatus.pending, (state) => {
        state.availableValidationProcesses.loadStatus = REQUEST_STATUS.LOADING;
      })
      .addCase(updateValidationProcessStatus.fulfilled, (state, action) => {
        const { courseId } = action.meta.arg;
        const courseIdxToUpdate = state.availableValidationProcesses?.data?.findIndex(
          (course) => course.courseId === courseId,
        );

        if (action.payload.status === VALIDATION_STATUS.IN_REVIEW) {
          state.availableValidationProcesses.courseIdsCurrentUserIsReviewing = [...state
            .availableValidationProcesses.courseIdsCurrentUserIsReviewing, courseId];
        } else {
          state.availableValidationProcesses.courseIdsCurrentUserIsReviewing = state
            .availableValidationProcesses.courseIdsCurrentUserIsReviewing.filter(
              (currentCourseId) => currentCourseId !== courseId,
            );
        }

        state.availableValidationProcesses.loadStatus = REQUEST_STATUS.SAVED;
        state.availableValidationProcesses.data[courseIdxToUpdate].validationProcessEvents.push(
          transformValidationProcessEvents(action.payload),
        );
      })
      .addCase(updateValidationProcessStatus.rejected, (state, action) => {
        state.availableValidationProcesses.loadStatus = REQUEST_STATUS.FAILED;
        state.availableValidationProcesses.error = action.error;
      });
  },
});

export const validationRecordReducer = validationRecordSlice.reducer;
