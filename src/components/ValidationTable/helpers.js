import { VALIDATION_STATUS } from '../../data/constants';
import { setPopUpMessage, updateValidationProcessStatus } from '../../data/slices';

/* eslint-disable import/prefer-default-export */
export const ActionsAvailable = {
  submitted: {
    courseAuthor: {
      action: async (row, dispatch) => {
        const { error } = await dispatch(
          updateValidationProcessStatus({ courseId: row.values.courseId, status: VALIDATION_STATUS.CANCELLED }),
        );

        if (error?.message) {
          dispatch(setPopUpMessage({ variant: 'danger', message: error.message }));
        }
      },
      label: 'Cancel validation',
    },
    validator: {
      action: async (row, dispatch) => {
        const { error } = await dispatch(
          updateValidationProcessStatus({ courseId: row.values.courseId, status: VALIDATION_STATUS.IN_REVIEW }),
        );

        if (error?.message) {
          dispatch(setPopUpMessage({ variant: 'danger', message: error.message }));
        }
      },
      label: 'Review course',
    },
  },
  draft: {
    courseAuthor: {
      action: async (row, dispatch) => {
        const { error } = await dispatch(
          updateValidationProcessStatus({ courseId: row.values.courseId, status: VALIDATION_STATUS.SUBMITTED }),
        );

        if (error?.message) {
          dispatch(setPopUpMessage({ variant: 'danger', message: error.message }));
        }
      },
      label: 'Re-submit for validation',
    },
  },
  cancelled: {
    courseAuthor: {
      action: async (row, dispatch) => {
        const { error } = await dispatch(
          updateValidationProcessStatus({ courseId: row.values.courseId, status: VALIDATION_STATUS.SUBMITTED }),
        );

        if (error?.message) {
          dispatch(setPopUpMessage({ variant: 'danger', message: error.message }));
        }
      },
      label: 'Re-submit for validation',
    },
  },
  'in review': {
    validator: {
      action: async (row, dispatch) => {
        const { error } = await dispatch(
          updateValidationProcessStatus({ courseId: row.values.courseId, status: VALIDATION_STATUS.SUBMITTED }),
        );

        if (error?.message) {
          dispatch(setPopUpMessage({ variant: 'danger', message: error.message }));
        }
      },
      label: 'Release course',
    },
  },
};
