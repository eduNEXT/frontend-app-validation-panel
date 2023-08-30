import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { getCoursesByUser, getValidationProcesses } from './api';
import {
  setCourses, updateCoursesStatus, updateValidationRecordStatus, setValidationRecords,
} from './slice';
import { REQUEST_STATUS, VALIDATION_ACCESS_ROLE } from './constants';

const getCourses = () => (
  async (dispatch) => {
    dispatch(updateCoursesStatus({ loadStatus: REQUEST_STATUS.LOADING }));
    try {
      const data = await getCoursesByUser();
      dispatch(setCourses({ loadStatus: REQUEST_STATUS.LOADED, courses: data.results }));
    } catch (error) {
      if (error.response && error.response.status === 403) {
        dispatch(updateCoursesStatus({ loadStatus: REQUEST_STATUS.DENIED }));
      } else {
        dispatch(updateCoursesStatus({ loadStatus: REQUEST_STATUS.FAILED }));
      }
    }
  }
);

const getValidationRecords = (org) => (
  async (dispatch) => {
    dispatch(updateValidationRecordStatus({ loadStatus: REQUEST_STATUS.LOADING }));
    try {
      const user = getAuthenticatedUser();
      const apiParams = user.roles.includes(VALIDATION_ACCESS_ROLE.AUTHOR) ? { usename: user.usename } : { org };
      const data = await getValidationProcesses(apiParams);
      dispatch(setValidationRecords({ loadStatus: REQUEST_STATUS.LOADED, validationRecords: data.results }));
    } catch (error) {
      if (error.response && error.response.status === 403) {
        dispatch(updateValidationRecordStatus({ loadStatus: REQUEST_STATUS.DENIED }));
      } else {
        dispatch(updateValidationRecordStatus({ loadStatus: REQUEST_STATUS.FAILED }));
      }
    }
  }
);

export { getCourses, getValidationRecords };
