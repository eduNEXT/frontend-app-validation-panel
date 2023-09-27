import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { FormLayout } from '../FormLayout';
import { adaptOptions, addUtils } from '../../../utils/helpers';
import { updateValidationProcessStatus } from '../../../data/slices/validationRecordSlice';
import { getAllowedStatuses, isPendingCourse } from '../helpers';
import { VALIDATION_STATUS } from '../../../data/constants';

const ValidatorReview = ({
  lastReviewEventInfo, isReviewConfirmed, onClose, courseId,
}) => {
  const dispatch = useDispatch();
  const isValidator = useSelector((state) => state.userInfo.userInfo.isValidator);
  const isPending = isPendingCourse(null, lastReviewEventInfo);

  const reasons = useSelector((state) => state.rejectionReasons.data);

  const validatorReviewFieldUtilsProps = [
    {
      name: 'reviewStartDate', label: 'Review start date', type: 'col', pos: 3, disabled: true,
    },
    {
      name: 'status', label: 'Status', type: 'col', pos: 4, options: isPending ? getAllowedStatuses(lastReviewEventInfo.status) : [], isSelect: isValidator,
    },
    {
      name: 'reason', label: 'Reason', type: 'row', pos: 5, options: reasons.length ? adaptOptions(reasons) : [], isSelect: isValidator,
    },
    {
      name: 'comment', label: 'Additional comments', type: 'row', pos: 6,
    },
  ];

  const lastValidationReviewInfoWithUtilsProps = addUtils(validatorReviewFieldUtilsProps, lastReviewEventInfo);

  const validationSchema = Yup.object().shape({
    status: Yup.string().required('Please select a status!'),
    reason: Yup.string().when('status', {
      is: (status) => status === VALIDATION_STATUS.DISAPPROVED,
      then: () => Yup.string().required('Please select a reason!'),
    }),
    comment: Yup.string().required('Please insert at least a short description about your review'),
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
          isValidator={isValidator}
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
