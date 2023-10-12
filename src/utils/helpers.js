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

export const PENDING_STATUSES = [VALIDATION_STATUS.IN_REVIEW, VALIDATION_STATUS.SUBMITTED];

export const getCurrentStatusCode = (status) => Object.entries(
  VALIDATION_STATUS_LABEL,
)?.find(([, value]) => value === status)?.[0];

export const adaptOptions = (optionsToAdapt) => optionsToAdapt?.map((option) => ({ key: option.name.replaceAll(' ', ''), id: option.id, label: option.name }));
