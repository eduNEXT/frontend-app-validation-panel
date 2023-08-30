const VALIDATION_STATUS = {
  SUBMITTED: 'Submitted',
  IN_REVIEW: 'In Review',
  DRAFT: 'Draft',
  APPROVED: 'Approved',
  DISAPPROVED: 'Disapproved',
  CANCELLED: 'Cancelled',
  EXEMPT: 'Exempt',
};

const VALIDATION_ACCESS_ROLE = {
  AUTHOR: 'author',
  VALIDATOR: 'validator',
};

const VALIDATION_ACTION = {
  SUBMIT: 'Submit for validation',
  CANCEL: 'Cancel validation',
};
const VALIDATION_API_PATH = {
  COURSE_CATEGORY: 'course-category',
  VALIDATION_BODY: 'validation-body',
  VALIDATION_PROCESS: 'validation-process',
  VALIDATION_EVENT: 'validation-process-event',
};

const REQUEST_STATUS = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  FAILED: 'FAILED',
  DENIED: 'DENIED',
  SAVING: 'SAVING',
  SAVED: 'SAVED',
};

export {
  REQUEST_STATUS,
  VALIDATION_ACCESS_ROLE,
  VALIDATION_ACTION,
  VALIDATION_API_PATH,
  VALIDATION_STATUS,
};
