import { ALLOWED_STATUS_CHANGES, VALIDATION_STATUS, VALIDATION_STATUS_LABEL } from '../../data/constants';
import { getCurrentStatusCode, getLastReviewEventInfo, PENDING_STATUSES } from '../../utils/helpers';

export const getOptions = (currentStatus) => {
  const currentStatusCode = getCurrentStatusCode(currentStatus);
  const adaptedOptions = [];
  Object.values(VALIDATION_STATUS).forEach((opt) => {
    if (ALLOWED_STATUS_CHANGES[currentStatusCode]?.includes(opt)) {
      adaptedOptions.push({
        key: opt,
        id: opt,
        label: VALIDATION_STATUS_LABEL[opt],
      });
    }
  });

  return adaptedOptions;
};

export const isPendingCourse = (course, lastReviewEventProp) => {
  const lastReviewEvent = getLastReviewEventInfo(course);
  return PENDING_STATUSES.includes(getCurrentStatusCode(lastReviewEventProp?.status ?? lastReviewEvent.status));
};

export const disableReasonField = (currentStatus) => {
  const needReason = [VALIDATION_STATUS.DISAPPROVED];
  return !needReason.includes(currentStatus);
};
