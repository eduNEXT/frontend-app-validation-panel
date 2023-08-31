import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { Button, Stack } from '@edx/paragon';

import { Field } from './Field';
import { ModalLayout } from '../ModalLayout';
import { getInitialValues } from './helpers';

const SubmitCourseForValidation = ({ isOpen, close }) => {
  const fieldsToRender = [
    {
      name: 'course_name',
      // select, textarea or input
      as: 'select',
      label: 'Course Name',
      description: 'Please select one of your courses from the list below',
      // prop when 'as' property is 'select'
      // This properties come from API or Constants
      options: [
        { key: 'regular_course', label: 'Regular Course' },
        { key: 'very_good_course', label: 'Very Good Course' },
        { key: 'bad_course', label: 'Bad Course' },
      ],
    },
    {
      name: 'validation_body',
      as: 'select',
      label: 'Validation Body',
      description: 'Please select the applicable validation body for your course',
      options: [
        { key: 'validator_body_1', label: 'Validator body #1' },
        { key: 'validator_body_2', label: 'Validator body #2' },
      ],
    },
    {
      name: 'category',
      as: 'select',
      label: 'Category',
      description: 'Please select the appropriate category for your course',
      options: [
        { key: 'category_1', label: 'Category 1' },
        { key: 'category_2', label: 'Category 2' },
        { key: 'category_3', label: 'Category 3' },
        { key: 'category_4', label: 'Category 4' },
      ],
    },
    {
      name: 'comments',
      as: 'textarea',
      label: 'Comments',
      description: 'Type any comment or explanation for your course',
    },
  ];

  const initialValues = getInitialValues(fieldsToRender);

  const {
    handleChange, values, handleSubmit, setValues,
  } = useFormik({
    initialValues,
    onSubmit: (formData) => {
      console.log(formData);
    },
  });

  const handleClose = () => {
    close();
    setValues(initialValues);
  };

  return (
    <ModalLayout isOpen={isOpen} onClose={handleClose}>
      <Stack gap={3}>
        <p style={{ fontSize: '1.5rem' }}>Submit a course for validation</p>
        <Stack gap={2}>
          {
            fieldsToRender.map((field) => (
              <Field
                key={field.name}
                handleChange={handleChange}
                value={values[field.name]}
                {...field}
              />
            ))
          }
        </Stack>
        <Stack gap={2} direction="horizontal" className="justify-content-end mb-4">
          <Button variant="tertiary" onClick={handleClose} className="px-5">Cancel</Button>
          <Button onClick={handleSubmit} className="px-5">Submit</Button>
        </Stack>
      </Stack>
    </ModalLayout>
  );
};

SubmitCourseForValidation.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
};

SubmitCourseForValidation.defaultProps = {
  isOpen: false,
  close: null,
};

export default SubmitCourseForValidation;
