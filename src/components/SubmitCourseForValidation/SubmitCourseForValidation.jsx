import PropTypes from 'prop-types';
import { Button, Form, Stack } from '@edx/paragon';
import { useFormik } from 'formik';

import { ModalLayout } from '../ModalLayout';

const SubmitCourseForValidation = ({ isOpen, close }) => {
  const fieldsToRender = [
    {
      name: 'course_name',
      type: 'select',
      label: 'Course Name',
      description: 'Please select one of your courses from the list below',
      options: [
        { key: 'regular_course', label: 'Regular Course' },
        { key: 'very_good_course', label: 'Very Good Course' },
        { key: 'bad_course', label: 'Bad Course' },
      ],
    },
    {
      name: 'validation_body',
      type: 'select',
      label: 'Validation Body',
      description: 'Please select the applicable validation body for your course',
      options: [
        { key: 'validator_body_1', label: 'Validator body #1' },
        { key: 'validator_body_2', label: 'Validator body #2' },
      ],
    },
    {
      name: 'category',
      type: 'select',
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
      type: 'textarea',
      label: 'Comments',
      description: 'Type any comment or explanation for your course',
    },
  ];

  const getInitialValues = (fieldData) => {
    const getDefaultValue = (options) => {
      if (options) {
        return options[0].key;
      }

      return '';
    };

    const initialValues = {};
    fieldData.forEach((field) => {
      initialValues[field.name] = getDefaultValue(field?.options);
    });

    return initialValues;
  };

  const {
    handleChange, values, handleSubmit, setValues,
  } = useFormik({
    initialValues: getInitialValues(fieldsToRender),
    onSubmit: (formData) => {
      console.log(formData);
    },
  });

  const handleClose = () => {
    close();
    setValues(getInitialValues(fieldsToRender));
  };

  return (
    <ModalLayout isOpen={isOpen} onClose={close}>
      <Stack gap={3}>
        <p style={{ fontSize: '1.5rem' }}>Submit a course for validation</p>
        <Stack gap={2}>
          {
            fieldsToRender.map((field) => (
              <Stack key={field.name}>
                <span style={{ fontSize: '1.25rem' }}>{field.label}</span>
                <span style={{ fontSize: '1rem' }}>{field.description}</span>
                <Form.Group>
                  <Form.Control name={field.name} as={field.type} onChange={handleChange} value={values[field.name]}>
                    { field.options?.map((optionInfo) => (
                      <option key={optionInfo.key} value={optionInfo.key}>{optionInfo.label}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Stack>
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
