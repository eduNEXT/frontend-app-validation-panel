import { ALLOWED_STATUS_CHANGES, VALIDATION_STATUS, VALIDATION_STATUS_LABEL } from '../../data/constants';
import { getCurrentStatusCode, getLastReviewEventInfo, PENDING_STATUSES } from '../../utils/helpers';

export const getAllowedStatuses = (currentStatus) => {
  const currentStatusCode = getCurrentStatusCode(currentStatus);
  const allowedStatuses = [];
  Object.values(VALIDATION_STATUS).forEach((opt) => {
    if (ALLOWED_STATUS_CHANGES[currentStatusCode]?.includes(opt)) {
      allowedStatuses.push({
        key: opt,
        id: opt,
        label: VALIDATION_STATUS_LABEL[opt],
      });
    }
  });

  return allowedStatuses;
};

export const isPendingCourse = (course, lastReviewEventProp) => {
  const lastReviewEvent = getLastReviewEventInfo(course);
  return PENDING_STATUSES.includes(getCurrentStatusCode(lastReviewEventProp?.status ?? lastReviewEvent.status));
};

export const disableReasonField = (currentStatus) => {
  const needReason = [VALIDATION_STATUS.DISAPPROVED];
  return !needReason.includes(currentStatus);
};
