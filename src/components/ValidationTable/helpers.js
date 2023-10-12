/* eslint-disable react/jsx-filename-extension */
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { VALIDATION_STATUS, VALIDATION_STATUS_LABEL } from '../../data/constants';
import { setPopUpMessage, updateValidationProcessStatus } from '../../data/slices';
import { getLastAndFirstValidationProcessEvents } from '../../utils/helpers';
import globalMessages from '../../messages';

/**
 * List of columns that will have filter options available.
 */
const filtersToShow = ['validationBody', 'status', 'categories', 'organization'];

/**
 * Adapt the last validation process event so that it can be accessed and rendered by
 * the data table of the Validation Panel.
 *
 * @param {Array} coursesToValidate - The array of courses to adapt.
 * @returns {Array} - An array where each course is extended with the properties
 * of the last validation process event.
 */
export const adaptToTableFormat = (coursesToValidate, availableReasons) => {
  const adaptedCourses = [];

  coursesToValidate?.forEach((course) => {
    const [
      lastValidationProcessEvent,
      firstValidationProcessEvent,
    ] = getLastAndFirstValidationProcessEvents(course);

    // Add the last validation process event properties to the course data
    adaptedCourses.push({
      ...course,
      ...lastValidationProcessEvent,
      reason: availableReasons?.find((reason) => reason.id === lastValidationProcessEvent?.reason)?.name,
      user: firstValidationProcessEvent.user,
      status: VALIDATION_STATUS_LABEL[lastValidationProcessEvent.status],
      createdAt: new Date(firstValidationProcessEvent?.createdAt).toLocaleDateString('en-GB'),
    });
  });

  return adaptedCourses;
};

export const createCustomFilterChoices = (data) => data.map(({ name }) => ({ value: name, name }));
export const statusFilterOptions = Object.values(VALIDATION_STATUS_LABEL).map(name => ({ value: name, name }));

/**
 * Generate the available columns for the table of the Validation Panel.
 *
 * @param {Array} coursesToValidate - The array of courses for which to generate columns.
 * @returns {Array} - An array of column objects with their associated properties.
 */
export const getColumns = (coursesToValidate, intl) => {
  const availableColumns = new Set();

  const processColumn = (key, includeFilter) => {
    const isCourseNameProperty = key === 'courseName';
    const shouldBeSearchByText = ['categories'];

    const properFilter = shouldBeSearchByText.includes(key)
      ? { filter: 'text' }
      : { filter: 'includesValue' };

    const shouldEnableTheFilter = includeFilter
      ? properFilter
      : {
        disableFilters: true,
      };

    // Define column properties based on whether it's the courseName column
    return isCourseNameProperty
      // Allow looking for courses in a searchbar through a string
      ? { Header: intl.formatMessage(globalMessages[key]), accessor: key }
      : {
        Header: intl.formatMessage(globalMessages[key]),
        accessor: key,
        ...shouldEnableTheFilter,
      };
  };

  coursesToValidate?.forEach((course) => {
    Object.keys(course).forEach((key) => {
      const value = course[key];

      if (Array.isArray(value) && value.some((arrayValue) => typeof arrayValue !== 'string')) {
        value.forEach((arrayValue) => {
          Object.keys(arrayValue).forEach((keyFromArrayElement) => {
            if (!availableColumns.has(keyFromArrayElement)) {
              availableColumns.add(keyFromArrayElement);
            }
          });
        });
      } else if (!availableColumns.has(key)) {
        availableColumns.add(key);
      }
    });
  });

  return Array.from(availableColumns).map((column) => {
    const includeFilter = filtersToShow.includes(column);
    return processColumn(column, includeFilter);
  });
};

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
      label: <FormattedMessage id="validation.process.action.cancel" defaultMessage="Cancel submission" description="Cancel a submission process" />,
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
      label: <FormattedMessage id="validation.process.action.review" defaultMessage="Assign me as validator" description="Assign a validator" />,
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
      label: <FormattedMessage id="validation.process.action.resubmit" defaultMessage="Resubmit for validation" description="Resubmit the course for validation" />,
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
      label: <FormattedMessage id="validation.process.action.resubmit" defaultMessage="Resubmit for validation" description="Resubmit the course for validation" />,
    },
  },
  'in review': {
    validator: {
      action: async (row, dispatch) => {
        const { error } = await dispatch(
          updateValidationProcessStatus({
            courseId: row.values.courseId,
            status: VALIDATION_STATUS.SUBMITTED,
            comment: 'The validator disengaged from the course',
          }),
        );

        if (error?.message) {
          dispatch(setPopUpMessage({ variant: 'danger', message: error.message }));
        }
      },
      label: <FormattedMessage id="validation.process.action.remove.validator" defaultMessage="Remove me as validator" description="Unassign a validator" />,
    },
  },
};
