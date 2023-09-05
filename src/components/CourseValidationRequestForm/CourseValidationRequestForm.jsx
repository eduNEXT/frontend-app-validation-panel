import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Stack } from '@edx/paragon';
import { useDispatch, useSelector } from 'react-redux';

import { getAvailableValidationBodies, getCourseCategoriesByCourseId, getCoursesByUsername } from '../../data/slices';

import { Field } from './Field';
import { ModalLayout } from '../ModalLayout';
import { getInitialValues, getCourseValidationRequestForm } from './helpers';

const CourseValidationRequestForm = ({ isOpen, close }) => {
  const dispatch = useDispatch();

  const availableUserCourses = useSelector((state) => state.courses.availableUserCourses.data.results);
  const availableValidationBodies = useSelector((state) => state.validationBody.availableValidationBodies.data.results);
  const availableCourseCategories = useSelector((state) => (
    state.courseCategories.availableCourseCategories.data.results));

  useEffect(() => {
    dispatch(getCoursesByUsername());
    dispatch(getCourseCategoriesByCourseId());
    dispatch(getAvailableValidationBodies());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validationRequestFormFields = getCourseValidationRequestForm(
    availableUserCourses,
    availableCourseCategories,
    availableValidationBodies,
  );
  const initialValues = getInitialValues(validationRequestFormFields);

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
        <span className="lead">Submit a course for validation</span>
        <Stack gap={2}>
          {
            validationRequestFormFields?.map((field) => (
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

CourseValidationRequestForm.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
};

CourseValidationRequestForm.defaultProps = {
  isOpen: false,
  close: null,
};

export default CourseValidationRequestForm;
