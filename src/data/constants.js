const VALIDATION_STATUS = {
  SUBMITTED: 'subm',
  IN_REVIEW: 'revi',
  DRAFT: 'drft',
  APPROVED: 'aprv',
  DISAPPROVED: 'dprv',
  CANCELLED: 'cncl',
  EXEMPT: 'exmp',
};

const VALIDATION_STATUS_LABEL = {
  subm: 'Submitted',
  revi: 'In Review',
  drft: 'Draft',
  aprv: 'Approved',
  dprv: 'Disapproved',
  cncl: 'Cancelled',
  exmp: 'Exempt',
};

export const ALLOWED_STATUS_CHANGES = {
  revi: [VALIDATION_STATUS.DRAFT, VALIDATION_STATUS.APPROVED, VALIDATION_STATUS.DISAPPROVED],
  drft: [VALIDATION_STATUS.SUBMITTED],
  cncl: [VALIDATION_STATUS.SUBMITTED],
};

const VALIDATION_ACCESS_ROLE = {
  AUTHOR: 'courseAuthor',
  VALIDATOR: 'validator',
};

const VALIDATION_ACTION = {
  SUBMIT: 'Submit for validation',
  CANCEL: 'Cancel validation',
};
const VALIDATION_API_PATH = {
  CATEGORIES: 'categories',
  VALIDATION_BODY: 'validation-bodies',
  VALIDATION_PROCESS: 'validation-processes',
  VALIDATION_EVENT: 'validation-process-event',
  USER_INFO: 'user-info',
  REJECTION_REASONS: 'rejection-reasons',
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
  VALIDATION_STATUS_LABEL,
};
