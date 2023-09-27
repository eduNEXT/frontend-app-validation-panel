import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Button, Stack } from '@edx/paragon';
import {
  exemptedFields,
  getFormValues,
  sortByPositionProp,
} from './helpers';
import { disableReasonField } from '../helpers';
import FormField from './FormField';

const FormLayout = ({
  data, useSpecialDateUsage, onSubmit, onCancel, isExempted, validationSchema,
}) => {
  const isValidator = useSelector((state) => state.userInfo.userInfo.isValidator);
  const [disableReason, setDisableReason] = useState();

  const {
    handleChange, values, handleSubmit, errors, touched,
  } = useFormik({
    initialValues: getFormValues(data, isValidator),
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    setDisableReason(disableReasonField(values.status));
  }, [values.status]);

  const submissionDate = data.find((field) => useSpecialDateUsage && field.label.toLowerCase().includes('date'));

  const shouldShowFieldWhenExempted = (fieldName) => !isExempted || !exemptedFields.includes(fieldName);

  const fields = data
    .sort(sortByPositionProp)
    .filter(
      (field) => !(field.name === submissionDate?.name) && shouldShowFieldWhenExempted(field.name),
    )
    .map((field) => (
      <FormField
        field={field}
        key={field.name}
        values={values}
        handleChange={handleChange}
        disableReason={disableReason}
        isValidator={isValidator}
        submissionDate={submissionDate}
        errorMessage={touched[field.name] && errors[field.name]}
      />
    ));

  return (
    <Stack direction="horizontal" className="justify-content-between align-items-start flex-wrap">
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
      disabled: PropTypes.bool,
      isSelect: PropTypes.bool,
      options: PropTypes.arrayOf(Object),
      name: PropTypes.string,
    }),
  ).isRequired,
  useSpecialDateUsage: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  isExempted: PropTypes.bool,
  validationSchema: PropTypes.shape(),
};

FormLayout.defaultProps = {
  useSpecialDateUsage: false,
  onSubmit: null,
  onCancel: null,
  isExempted: false,
  validationSchema: null,
};

export default FormLayout;
