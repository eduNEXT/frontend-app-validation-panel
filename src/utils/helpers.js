import moment from 'moment';
import { CheckboxFilter } from '@edx/paragon';

/**
 * Mapping of column keys to their human-readable names for the table.
 */
export const tableColumns = {
  course_name: 'Course Name',
  course_id: 'Course ID',
  organization: 'Organization',
  categories: 'Categories',
  validation_body: 'Validation body',
  status: 'Status',
  created_at: 'Submission date',
  reason: 'Reason',
  comment: 'Comment',
  user: 'Course author',
};

/**
 * List of columns that will have filter options available.
 */
const filtersToShow = ['validation_body', 'status', 'categories', 'organization'];

/**
 * Adapt the last validation process event so that it can be accessed and rendered by
 * the data table of the Validation Panel.
 *
 * @param {Array} coursesToValidate - The array of courses to adapt.
 * @returns {Array} - An array where each course is extended with the properties
 * of the last validation process event.
 */
export const adaptToTableFormat = (coursesToValidate) => {
  const adaptedCourses = [];

  coursesToValidate.forEach((course) => {
    let lastValidationProcessEvent = null;
    let firstValidationProcessEvent = null;
    const courseCreatedAt = moment(course.created_at);

    course.validation_process_events.forEach((event) => {
      const eventCreatedAt = moment(event.created_at);

      if (!lastValidationProcessEvent || eventCreatedAt.isAfter(lastValidationProcessEvent.created_at)) {
        lastValidationProcessEvent = event;
      }

      if (!firstValidationProcessEvent || eventCreatedAt.isBefore(firstValidationProcessEvent.created_at)) {
        firstValidationProcessEvent = event;
      }
    });

    // Add the last validation process event properties to the course data
    adaptedCourses.push({
      ...course,
      ...lastValidationProcessEvent,
      created_at: courseCreatedAt.isBefore(firstValidationProcessEvent.created_at)
        ? courseCreatedAt
        : firstValidationProcessEvent.created_at,
    });
  });

  return adaptedCourses;
};

/**
 * Generate filter choices for the given courses and selected filter.
 *
 * @param {Array} coursesToValidate - The array of courses for which to generate filter choices.
 * @param {string} selectedFilter - The selected filter for which to generate choices.
 * @returns {Array} - An array of filter choices or an object with filter choices per property.
 */
export const getFilterChoices = (coursesToValidate, selectedFilter) => {
  const availableFilters = {};

  // Collect all possible filter values from courses
  coursesToValidate.forEach((course) => {
    Object.entries(course).forEach(([filterName, filterValue]) => {
      if (typeof filterValue === 'string' || Array.isArray(filterValue)) {
        availableFilters[filterName] = [
          ...(availableFilters[filterName] || []),
          ...(Array.isArray(filterValue) ? filterValue : [filterValue]),
        ];
      }
    });
  });

  if (selectedFilter) {
    // Return unique filter choices for the selected filter
    const uniqueValues = [...new Set(availableFilters[selectedFilter])];
    return uniqueValues.map((newFilter) => ({
      name: newFilter,
      value: newFilter,
    }));
  }

  // Return formatted filter choices for all properties
  return Object.entries(availableFilters).reduce((formattedFilters, [filterName, filterValues]) => {
    const uniqueValues = [...new Set(filterValues)];
    formattedFilters[filterName] = uniqueValues.map((newFilter) => ({
      name: newFilter,
      value: newFilter,
    }));
    return formattedFilters;
  }, {});
};

/**
 * Generate the available columns for the table of the Validation Panel.
 *
 * @param {Array} coursesToValidate - The array of courses for which to generate columns.
 * @returns {Array} - An array of column objects with their associated properties.
 */
export const getColumns = (coursesToValidate) => {
  const availableColumns = new Set();

  const processColumn = (key, includeFilter, filterChoices) => {
    const isCourseNameProperty = key === 'course_name';
    const shouldEnableTheFilter = includeFilter
      ? {
        Filter: CheckboxFilter,
        filter: 'includesValue',
        filterChoices,
      }
      : {
        Filter: false,
      };

    // Define column properties based on whether it's the course_name column
    return isCourseNameProperty
      // Allow looking for courses in a searchbar through a string
      ? { Header: tableColumns[key], accessor: key }
      : {
        Header: tableColumns[key],
        accessor: key,
        ...shouldEnableTheFilter,
      };
  };

  coursesToValidate.forEach((course) => {
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
    const filterChoices = includeFilter ? getFilterChoices(adaptToTableFormat(coursesToValidate), column) : false;
    return processColumn(column, includeFilter, filterChoices);
  });
};
import { VALIDATION_STATUS } from '../data/constants';

export const getLastReviewEvent = (course) => {
  let lastValidationProcessEvent = null;
  course.validation_process_events.forEach((event) => {
    const eventCreatedAt = new Date(event.created_at);
    if (!lastValidationProcessEvent || eventCreatedAt > new Date(lastValidationProcessEvent.created_at)) {
      lastValidationProcessEvent = event;
    }
  });

  return lastValidationProcessEvent;
};

export const getSubmissionInfo = (course) => {
  const submissionProcessEvent = course.validation_process_events.find(
    (validationProcess) => validationProcess.status.toLowerCase() === VALIDATION_STATUS.SUBMITTED.toLowerCase(),
  );
  const courseAuthor = submissionProcessEvent.user;
  const submissionDate = submissionProcessEvent.created_at;
  const submissionComments = submissionProcessEvent.comment;
  const lastValidationProcessEvent = getLastReviewEvent(course);

  return {
    courseName: course.course_name,
    courseId: course.course_id,
    organization: course.organization,
    categories: course.categories,
    courseAuthor,
    submissionDate,
    submissionComments,
    validationBody: course.validation_body,
    reviewer: lastValidationProcessEvent.user,
  };
};

export const getLastReviewEventInfo = (course) => {
  const lastValidationProcessEvent = getLastReviewEvent(course);

  return {
    reviewStartDate: lastValidationProcessEvent.created_at,
    status: lastValidationProcessEvent.status,
    reason: lastValidationProcessEvent.reason,
    additionalComment: lastValidationProcessEvent.comment,
  };
};

export const addUtils = (utils, data) => utils.map((field) => ({
  ...field,
  value: data[field.name],
}));
