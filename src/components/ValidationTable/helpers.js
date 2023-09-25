import { VALIDATION_STATUS } from '../../data/constants';
import { getAvailableValidationProcesses, updateValidationProcessStatus } from '../../data/slices';

/* eslint-disable import/prefer-default-export */
export const ActionsAvailable = {
  submitted: {
    courseAuthor: {
      action: (row, dispatch) => {
        dispatch(
          updateValidationProcessStatus({ courseId: row.values.courseId, status: VALIDATION_STATUS.CANCELLED }),
        ).then(() => {
          dispatch(getAvailableValidationProcesses());
        });
      },
      label: 'Cancel validation',
    },
    validator: {
      action: (row, dispatch) => {
        dispatch(
          updateValidationProcessStatus({ courseId: row.values.courseId, status: VALIDATION_STATUS.IN_REVIEW }),
        ).then(() => {
          dispatch(getAvailableValidationProcesses());
        });
      },
      label: 'Review course',
    },
  },
  draft: {
    courseAuthor: {
      action: (row, dispatch) => {
        dispatch(
          updateValidationProcessStatus({ courseId: row.values.courseId, status: VALIDATION_STATUS.SUBMITTED }),
        ).then(() => {
          dispatch(getAvailableValidationProcesses());
        });
      },
      label: 'Re-submit for validation',
    },
  },
  cancelled: {
    courseAuthor: {
      action: (row, dispatch) => {
        dispatch(
          updateValidationProcessStatus({ courseId: row.values.courseId, status: VALIDATION_STATUS.SUBMITTED }),
        ).then(() => {
          dispatch(getAvailableValidationProcesses());
        });
      },
      label: 'Re-submit for validation',
    },
  },
  disapproved: {
    courseAuthor: {
      action: (row, dispatch) => {
        dispatch(
          updateValidationProcessStatus({ courseId: row.values.courseId, status: VALIDATION_STATUS.SUBMITTED }),
        ).then(() => {
          dispatch(getAvailableValidationProcesses());
        });
      },
      label: 'Re-submit for validation',
    },
  },
  'in review': {
    validator: {
      action: (row, dispatch) => {
        dispatch(
          updateValidationProcessStatus({ courseId: row.values.courseId, status: VALIDATION_STATUS.SUBMITTED }),
        ).then(() => {
          dispatch(getAvailableValidationProcesses());
        });
      },
      label: 'Release course',
    },
  },
};
