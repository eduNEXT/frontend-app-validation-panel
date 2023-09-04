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
  const exemptionProcessEvent = course.validation_process_events.find(
    (validationProcess) => validationProcess.status.toLowerCase() === VALIDATION_STATUS.EXEMPT.toLowerCase(),
  );

  const courseAuthor = exemptionProcessEvent?.user || submissionProcessEvent.user;
  const submissionDate = exemptionProcessEvent?.created_at || submissionProcessEvent.created_at;
  const submissionComments = exemptionProcessEvent?.comment || submissionProcessEvent.comment;
  const lastValidationProcessEvent = getLastReviewEvent(course);

  const isExempted = !!exemptionProcessEvent;

  return {
    isExempted,
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
