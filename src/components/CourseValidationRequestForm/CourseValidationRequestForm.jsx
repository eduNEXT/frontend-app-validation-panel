import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { FormikProvider, useFormik } from 'formik';
import { Button, Stack } from '@edx/paragon';
import { useDispatch, useSelector } from 'react-redux';

import {
  getCoursesByUsername,
  createValidationProcess,
  setPopUpMessage,
} from '../../data/slices';

import { SelectField } from '../SelectField';
import { ModalLayout } from '../ModalLayout';
import { getCourseValidationRequestForm } from './helpers';
import { getValidationBodies } from '../../data/api';
import globalMessages from '../../messages';
import messages from './messages';

const CourseValidationRequestForm = ({ isOpen, close }) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const availableUserCourses = useSelector((state) => state.courses.availableUserCourses.data.results);
  const [availableValidationBodies, setAvailableValidationBodies] = useState([]);
  const availableCourseCategories = useSelector((state) => (
    state.courseCategories.availableCourseCategories.data));
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    dispatch(getCoursesByUsername());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validationRequestFormFields = getCourseValidationRequestForm(
    availableUserCourses,
    availableCourseCategories,
    availableValidationBodies,
    intl,
  );

  const initialValues = {
    courseId: null,
    comment: '',
    validationBodyId: null,
    // When is needed category as array
    // categoryIds: [],
    categoryId: null,
  };

  const FormSchema = Yup.object().shape({
    courseId: Yup.string().required(intl.formatMessage(messages.feedbackSelectCourse)),
    validationBodyId: Yup.number().required(intl.formatMessage(messages.feedbackSelectValidationBody)),
    // When is needed category as array
    // categoryIds: Yup.array().of(Yup.string()).min(1, 'Please select at least one category!'),
    categoryId: Yup.number().required(intl.formatMessage(messages.feedbackSelectCategory)),
    comment: Yup.string(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: FormSchema,
    onSubmit: async (formData) => {
      const { error } = await dispatch(
        createValidationProcess(formData),
      );

      // eslint-disable-next-line no-use-before-define
      handleClose();

      if (error?.message) {
        dispatch(setPopUpMessage({ variant: 'danger', message: error.message }));
      }
    },
  });

  useEffect(() => {
    let isCurrent = true;
    if (formik.values.courseId) {
      setIsLoading(true);
      getValidationBodies(formik.values.courseId).then((data) => {
        if (isCurrent) {
          setAvailableValidationBodies(data);
          setIsLoading(false);
        }
      });
    }
    if (!formik.values.courseId) {
      formik.values.validationBodyId = null;
    }
    return () => {
      isCurrent = false;
      setAvailableValidationBodies([]);
    };
  }, [formik.values, setAvailableValidationBodies, dispatch]);

  const handleClose = () => {
    close();
    formik.resetForm();
  };

  return (
    <FormikProvider value={formik}>
      <ModalLayout isOpen={isOpen} onClose={handleClose}>
        <Stack gap={3}>
          <span className="lead">{intl.formatMessage(messages.CourseValidationFormTitle)}</span>
          <Stack gap={2}>
            {
              validationRequestFormFields?.map((field) => (
                <SelectField
                  key={field.name}
                  setFieldValue={formik.setFieldValue}
                  handleChange={formik.handleChange}
                  value={formik.values[field.name]}
                  errorMessage={formik.touched[field.name] && formik.errors[field.name]}
                  {...field}
                  isLoading={field.name === 'validationBodyId' && isLoading}
                />
              ))
            }
          </Stack>
          <Stack gap={2} direction="horizontal" className="justify-content-end mb-4">
            <Button variant="tertiary" onClick={handleClose} className="px-5">{intl.formatMessage(globalMessages.formActionCancel)}</Button>
            <Button onClick={formik.handleSubmit} className="px-5">{intl.formatMessage(globalMessages.formActionSubmmit)}</Button>
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
