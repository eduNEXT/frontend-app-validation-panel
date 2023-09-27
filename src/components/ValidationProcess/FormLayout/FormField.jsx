import PropTypes from 'prop-types';
import { FormattedDate } from '@edx/frontend-platform/i18n';
import { FormInput } from './FormInput';
import { SelectField } from '../../SelectField';
import { formatDateIfDateField } from './helpers';

const COL_WIDTH = '50%';
const FULL_WIDTH = '100%';

const FormField = ({
  field, values, handleChange, disableReason, isValidator, submissionDate, errorMessage,
}) => {
  const isDisabled = !isValidator || field.disabled || (field?.name === 'reason' && disableReason);
  const isColumn = field.type === 'col';

  return (
    <div style={{ width: isColumn ? COL_WIDTH : FULL_WIDTH }} key={field.name}>
      {field.isSelect ? (
        <SelectField
          disabled={isDisabled}
          label={field.label}
          name={field.name}
          as="select"
          options={field.options}
          handleChange={handleChange}
          value={values[field.name]}
          type={field.type}
          errorMessage={errorMessage}
        />
      ) : (
        <FormInput
          disabled={isDisabled}
          errorMessage={errorMessage}
          name={field.name}
          handleChange={handleChange}
          value={formatDateIfDateField(field.name, values[field.name])}
          type={field.type}
          label={field.label}
          labelAssistant={
            field.label.toLowerCase().includes('name') && submissionDate && (
              <div className="text-light-800">
                <span>{submissionDate?.label}: </span>
                <FormattedDate
                  value={new Date(submissionDate.value)}
                  year="numeric"
                  month="short"
                  day="2-digit"
                />
              </div>
            )
          }
        />
      )}
    </div>
  );
};

FormField.propTypes = {
  field: PropTypes.shape({
    isSelect: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    options: PropTypes.arrayOf(Object),
    name: PropTypes.string,
    type: PropTypes.string,
    pos: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  }).isRequired,
  values: PropTypes.shape({
    comment: PropTypes.string,
    reason: PropTypes.string,
    reviewStartDate: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  disableReason: PropTypes.bool,
  isValidator: PropTypes.bool.isRequired,
  submissionDate: PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
  errorMessage: PropTypes.string,
};

FormField.defaultProps = {
  disableReason: false,
  submissionDate: { value: '' },
  errorMessage: '',
};

export default FormField;
