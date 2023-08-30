import PropTypes from 'prop-types';
import { Button, Stack } from '@edx/paragon';
import { FormattedDate } from '@edx/frontend-platform/i18n';
import { useFormik } from 'formik';

import { FormInput } from './FormInput';

const getFormValues = (data) => {
  const values = {};
  data.forEach((property) => {
    values[property.name] = property.value;
  });

  return values;
};

const FormLayout = ({
  data, useSpecialDateUsage, onSubmit, onCancel,
}) => {
  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: getFormValues(data),
    onSubmit,
  });

  const submissionDate = data.find((field) => useSpecialDateUsage && field.label.toLowerCase().includes('date'));
  const isValidator = false;

  const fields = data
    .sort((a, b) => {
      if (a.pos < b.pos) {
        return -1;
      }
      if (a.pos > b.pos) {
        return 1;
      }
      return 0;
    })
    .map(
      (field) => {
        const isDisabled = !isValidator || field.disabled;
        return (field.label !== submissionDate?.label && (
        <FormInput
          disabled={isDisabled}
          key={field.name}
          name={field.name}
          handleChange={handleChange}
          value={values[field.name]}
          type={field.type}
          label={field.label}
          labelAssistant={(field.label.toLowerCase().includes('name') && submissionDate) && (
            <div className="text-light-800">
              <span>{submissionDate?.label}: </span>
              <FormattedDate value={new Date(submissionDate.value)} year="numeric" month="short" day="2-digit" />
            </div>
          )}
        />
        ));
      },
    );

  return (
    <Stack direction="horizontal" className="justify-content-between flex-wrap">
      {fields}
      {isValidator && (
      <Stack direction="horizontal" gap={2} className="w-100 justify-content-end mt-4">
        {!!onCancel && <Button className="px-5" variant="outline-primary" onClick={onCancel}>Cancel</Button>}
        {!!onSubmit && <Button className="px-5" variant="primary" onClick={handleSubmit}>Submit</Button>}
      </Stack>
      )}
    </Stack>
  );
};

FormLayout.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      type: PropTypes.string,
      pos: PropTypes.number,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    }),
  ).isRequired,
  useSpecialDateUsage: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

FormLayout.defaultProps = {
  useSpecialDateUsage: false,
  onSubmit: null,
  onCancel: null,
};

export default FormLayout;
