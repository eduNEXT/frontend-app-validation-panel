import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { Button, Stack } from '@edx/paragon';
import { useDispatch, useSelector } from 'react-redux';

import {
  getAvailableValidationBodies,
  getCourseCategories,
  getCoursesByUsername,
  createValidationProcess,
} from '../../data/slices';

import { SelectField } from '../SelectField';
import { ModalLayout } from '../ModalLayout';
import { getAdaptedData, getCourseValidationRequestForm } from './helpers';

const CourseValidationRequestForm = ({ isOpen, close }) => {
  const dispatch = useDispatch();

  const availableUserCourses = useSelector((state) => state.courses.availableUserCourses.data.results);
  const availableValidationBodies = useSelector((state) => state.validationBody.availableValidationBodies.data);
  const availableCourseCategories = useSelector((state) => (
    state.courseCategories.availableCourseCategories.data));

  useEffect(() => {
    dispatch(getCoursesByUsername());
    dispatch(getCourseCategories());
    dispatch(getAvailableValidationBodies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validationRequestFormFields = getCourseValidationRequestForm(
    availableUserCourses,
    availableCourseCategories,
    availableValidationBodies,
  );

  const initialValues = {
    courseId: null,
    comment: '',
    validationBodyId: null,
    categoryIds: [],
  };

  const FormSchema = Yup.object().shape({
    courseId: Yup.string().required('Please select a course!'),
    validationBodyId: Yup.number().required('Please select a validation body!'),
    categoryIds: Yup.array().of(Yup.string()).min(1, 'Please select at least one category!'),
    comment: Yup.string().required('Please insert at least a short description about your submission'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: FormSchema,
    onSubmit: (formData) => {
      dispatch(createValidationProcess(getAdaptedData(formData, availableCourseCategories)));
      // eslint-disable-next-line no-use-before-define
      handleClose();
    },
  });

  const handleClose = () => {
    close();
    formik.resetForm();
  };

  return (
    <FormikProvider value={formik}>
      <ModalLayout isOpen={isOpen} onClose={handleClose}>
        <Stack gap={3}>
          <span className="lead">Submit a course for validation</span>
          <Stack gap={2}>
            {
              validationRequestFormFields?.map((field) => (
                <SelectField
                  key={field.name}
                  handleChange={formik.handleChange}
                  value={formik.values[field.name]}
                  errorMessage={formik.touched[field.name] && formik.errors[field.name]}
                  {...field}
                />
              ))
            }
          </Stack>
          <Stack gap={2} direction="horizontal" className="justify-content-end mb-4">
            <Button variant="tertiary" onClick={handleClose} className="px-5">Cancel</Button>
            <Button onClick={formik.handleSubmit} className="px-5">Submit</Button>
          </Stack>
        </Stack>
      </ModalLayout>
    </FormikProvider>
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
