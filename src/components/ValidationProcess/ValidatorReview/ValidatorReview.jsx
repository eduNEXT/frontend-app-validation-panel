import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from '@edx/frontend-platform/i18n';
import * as Yup from 'yup';

import { FormLayout } from '../FormLayout';
import { adaptOptions, addUtils } from '../../../utils/helpers';
import { updateValidationProcessStatus } from '../../../data/slices/validationRecordSlice';
import { getAllowedStatuses, isPendingCourse } from '../helpers';
import { VALIDATION_STATUS } from '../../../data/constants';
import globalMessages from '../../../messages';
import messages from '../messages';

const ValidatorReview = ({
  lastReviewEventInfo, isReviewConfirmed, onClose, courseId,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const isValidator = useSelector((state) => state.userInfo.userInfo.isValidator);
  const isPending = isPendingCourse(null, lastReviewEventInfo);

  const reasons = useSelector((state) => state.rejectionReasons.data);

  const validatorReviewFieldUtilsProps = [
    {
      name: 'reviewStartDate', label: intl.formatMessage(messages.validatorReviewStartDate), type: 'col', pos: 3, disabled: true,
    },
    {
      name: 'status', label: intl.formatMessage(globalMessages.status), type: 'col', pos: 4, options: isPending ? getAllowedStatuses(lastReviewEventInfo.status) : [], isSelect: isValidator,
    },
    {
      name: 'reason', label: intl.formatMessage(globalMessages.reason), type: 'row', pos: 5, options: reasons.length ? adaptOptions(reasons) : [], isSelect: isValidator,
    },
    {
      name: 'comment', label: intl.formatMessage(messages.validatorReviewComments), type: 'row', pos: 6,
    },
  ];

  const lastValidationReviewInfoWithUtilsProps = addUtils(validatorReviewFieldUtilsProps, lastReviewEventInfo);

  const validationSchema = Yup.object().shape({
    status: Yup.string().required(intl.formatMessage(messages.feedbackSelectStatus)),
    reason: Yup.string().when('status', {
      is: (status) => status === VALIDATION_STATUS.DISAPPROVED,
      then: () => Yup.string().required(intl.formatMessage(messages.feedbackSelectReason)),
    }),
    comment: Yup.string().required(intl.formatMessage(messages.feedbackComment)),
  });

  const handleSubmit = (formData) => {
    if (!formData.reason) {
      // eslint-disable-next-line no-param-reassign
      delete formData.reason;
    }

    dispatch(updateValidationProcessStatus({
      ...formData,
      courseId,
    }))
      .then(() => {
        onClose();
      });
  };

  return (
    <div>
      {(!isValidator || isReviewConfirmed) && (
        <FormLayout
          data={lastValidationReviewInfoWithUtilsProps}
          onSubmit={handleSubmit}
          onCancel={onClose}
          validationSchema={validationSchema}
        />
      )}
    </div>
  );
};

ValidatorReview.propTypes = {
  lastReviewEventInfo: PropTypes.shape({
    validationBody: PropTypes.string,
    reviewer: PropTypes.string,
    reviewStartDate: PropTypes.string,
    status: PropTypes.string,
    reason: PropTypes.string,
    additionalComment: PropTypes.string,
  }).isRequired,
  isReviewConfirmed: PropTypes.bool,
  onClose: PropTypes.func,
  courseId: PropTypes.string.isRequired,
};

ValidatorReview.defaultProps = {
  isReviewConfirmed: false,
  onClose: null,
};

export default ValidatorReview;
