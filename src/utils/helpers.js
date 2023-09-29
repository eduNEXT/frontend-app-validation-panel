import { VALIDATION_STATUS, VALIDATION_STATUS_LABEL } from '../data/constants';

export const getLastAndFirstValidationProcessEvents = (course) => {
  let lastValidationProcessEvent = null;
  let firstValidationProcessEvent = null;

  course?.validationProcessEvents?.forEach((event) => {
    const eventCreatedAt = new Date(event?.createdAt);

    if (!lastValidationProcessEvent || eventCreatedAt > new Date(lastValidationProcessEvent?.createdAt)) {
      lastValidationProcessEvent = event;
    }

    if (!firstValidationProcessEvent || eventCreatedAt < new Date(firstValidationProcessEvent?.createdAt)) {
      firstValidationProcessEvent = event;
    }
  });

  return [lastValidationProcessEvent, firstValidationProcessEvent];
};

export const getSubmissionInfo = (course) => {
  const submissionProcessEvent = course?.validationProcessEvents?.find(
    (validationProcess) => validationProcess?.status.toLowerCase() === VALIDATION_STATUS.SUBMITTED.toLowerCase(),
  );
  const exemptionProcessEvent = course?.validationProcessEvents?.find(
    (validationProcess) => validationProcess?.status.toLowerCase() === VALIDATION_STATUS.EXEMPT.toLowerCase(),
  );

  const courseAuthor = exemptionProcessEvent?.user?.fullName || submissionProcessEvent?.user?.fullName;
  const submissionDate = exemptionProcessEvent?.createdAt || submissionProcessEvent?.createdAt;
  const submissionComments = exemptionProcessEvent?.comment || submissionProcessEvent?.comment;

  const isExempted = !!exemptionProcessEvent;

  return {
    isExempted,
    courseName: course.courseName,
    courseId: course.courseId,
    reviewer: course.currentValidationUser,
    organization: course.organization,
    categories: course.categories,
    courseAuthor,
    submissionDate,
    submissionComments,
    validationBody: course.validationBody,
  };
};

export const getLastReviewEventInfo = (course, availableReasons) => {
  const [lastValidationProcessEvent] = getLastAndFirstValidationProcessEvents(course);

  return {
    reviewStartDate: lastValidationProcessEvent?.createdAt,
    status: VALIDATION_STATUS_LABEL[lastValidationProcessEvent?.status],
    reason: availableReasons?.find((reason) => reason.id === lastValidationProcessEvent?.reason)?.name,
    comment: lastValidationProcessEvent?.comment,
  };
};

export const addUtils = (utils, data) => utils.map((field) => ({
  ...field,
  value: data[field?.name],
}));

/**
 * Mapping of column keys to their human-readable names for the table.
 */
export const tableColumns = {
  courseName: 'Course Name',
  courseId: 'Course ID',
  organization: 'Organization',
  categories: 'Categories',
  validationBody: 'Validation body',
  status: 'Status',
  createdAt: 'Submission date',
  reason: 'Reason',
  comment: 'Comment',
  user: 'Course author',
};

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
    // eslint-disable-next-line no-param-reassign
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
    const isCourseNameProperty = key === 'courseName';
    const shouldBeSearchByText = ['categories'];

    const properFilter = shouldBeSearchByText.includes(key)
      ? { filter: 'text', filterChoices }
      : { filter: 'includesValue', filterChoices };

    const shouldEnableTheFilter = includeFilter
      ? properFilter
      : {
        disableFilters: true,
      };

    // Define column properties based on whether it's the courseName column
    return isCourseNameProperty
      // Allow looking for courses in a searchbar through a string
      ? { Header: tableColumns[key], accessor: key }
      : {
        Header: tableColumns[key],
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
    const filterChoices = includeFilter ? getFilterChoices(adaptToTableFormat(coursesToValidate), column) : false;
    return processColumn(column, includeFilter, filterChoices);
  });
};

export const PENDING_STATUSES = [VALIDATION_STATUS.IN_REVIEW, VALIDATION_STATUS.SUBMITTED];

export const getCurrentStatusCode = (status) => Object.entries(
  VALIDATION_STATUS_LABEL,
)?.find(([, value]) => value === status)?.[0];

export const adaptOptions = (optionsToAdapt) => optionsToAdapt?.map((option) => ({ key: option.name.replaceAll(' ', ''), id: option.id, label: option.name }));
