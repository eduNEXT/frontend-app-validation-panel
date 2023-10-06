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
  let submissionProcessEvent = {};
  course?.validationProcessEvents?.forEach(
    (currentValidationProcess) => {
      if (currentValidationProcess?.status === VALIDATION_STATUS.SUBMITTED) {
        if (
          !submissionProcessEvent?.createdAt || submissionProcessEvent?.createdAt > currentValidationProcess.createdAt
        ) {
          submissionProcessEvent = currentValidationProcess;
        }
      }
    },
    {},
  );
  const exemptionProcessEvent = course?.validationProcessEvents?.find(
    (validationProcess) => validationProcess?.status.toLowerCase() === VALIDATION_STATUS.EXEMPT.toLowerCase(),
  );

  const courseAuthor = exemptionProcessEvent?.user || submissionProcessEvent?.user;
  const submissionDate = exemptionProcessEvent?.createdAt || submissionProcessEvent?.createdAt;
  const submissionComments = exemptionProcessEvent?.comment || submissionProcessEvent?.comment;

  const isExempted = !!exemptionProcessEvent;

  return {
    isExempted,
    courseName: course.courseName,
    courseId: course.courseId,
    reviewer: course.currentValidationUser || 'Not assigned',
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

export const createCustomFilterChoices = (data) => data.map(({ name }) => ({ value: name, name }));
export const statusFilterOptions = Object.values(VALIDATION_STATUS_LABEL).map(name => ({ value: name, name }));

/**
 * Generate the available columns for the table of the Validation Panel.
 *
 * @param {Array} coursesToValidate - The array of courses for which to generate columns.
 * @returns {Array} - An array of column objects with their associated properties.
 */
export const getColumns = (coursesToValidate) => {
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
    return processColumn(column, includeFilter);
  });
};

export const PENDING_STATUSES = [VALIDATION_STATUS.IN_REVIEW, VALIDATION_STATUS.SUBMITTED];

export const getCurrentStatusCode = (status) => Object.entries(
  VALIDATION_STATUS_LABEL,
)?.find(([, value]) => value === status)?.[0];

export const adaptOptions = (optionsToAdapt) => optionsToAdapt?.map((option) => ({ key: option.name.replaceAll(' ', ''), id: option.id, label: option.name }));
