import PropTypes from 'prop-types';

import { FormLayout } from '../FormLayout';
import { addUtils } from '../../../utils/helpers';

const validatorReviewFieldUtilsProps = [
  {
    name: 'reviewStartDate', label: 'Review start date', type: 'col', pos: 3, disabled: true,
  },
  {
    name: 'status', label: 'Status', type: 'col', pos: 4,
  },
  {
    name: 'reason', label: 'Reason', type: 'row', pos: 5,
  },
  {
    name: 'additionalComment', label: 'Additional comments', type: 'row', pos: 6,
  },
];

const ValidatorReview = ({ lastReviewEventInfo, didValidatorConfirmReview }) => {
  const lastValidationReviewInfoWithUtilsProps = addUtils(validatorReviewFieldUtilsProps, lastReviewEventInfo);
  const isValidator = localStorage.getItem('isValidator') === 'true';

  return (
    <div>
      {(!isValidator || didValidatorConfirmReview) && (
        <FormLayout
          data={lastValidationReviewInfoWithUtilsProps}
          onSubmit={(formData) => console.log(formData)}
          onCancel={() => console.log('Comer')}
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
  didValidatorConfirmReview: PropTypes.bool,
};

ValidatorReview.defaultProps = {
  didValidatorConfirmReview: false,
};

export default ValidatorReview;
