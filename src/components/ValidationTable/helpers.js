import { VALIDATION_STATUS } from '../../data/constants';
import { updateValidationProcessStatus } from '../../data/slices';

/* eslint-disable import/prefer-default-export */
export const ActionsAvailable = {
  submitted: {
    courseAuthor: {
      action: (row, dispatch) => {
        dispatch(
          updateValidationProcessStatus({ courseId: row.values.courseId, status: VALIDATION_STATUS.CANCELLED }),
        );
      },
      label: 'Cancel validation',
    },
    validator: {
      action: (row, dispatch) => {
        dispatch(
          updateValidationProcessStatus({ courseId: row.values.courseId, status: VALIDATION_STATUS.IN_REVIEW }),
        );
      },
      label: 'Review course',
    },
  },
  draft: {
    courseAuthor: {
      action: (row, dispatch) => {
        dispatch(
          updateValidationProcessStatus({ courseId: row.values.courseId, status: VALIDATION_STATUS.SUBMITTED }),
        );
      },
      label: 'Re-submit for validation',
    },
  },
  cancelled: {
    courseAuthor: {
      action: (row, dispatch) => {
        dispatch(
          updateValidationProcessStatus({ courseId: row.values.courseId, status: VALIDATION_STATUS.SUBMITTED }),
        );
      },
      label: 'Re-submit for validation',
    },
  },
  'in review': {
    validator: {
      action: (row, dispatch) => {
        dispatch(
          updateValidationProcessStatus({ courseId: row.values.courseId, status: VALIDATION_STATUS.SUBMITTED }),
        );
      },
      label: 'Release course',
    },
  },
};
