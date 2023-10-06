/* eslint-disable import/prefer-default-export */
import { adaptOptions } from '../../utils/helpers';

export const getCourseValidationRequestForm = (
  availableUserCourses,
  availableCourseCategories,
  availableValidationBodies,
) => ([
  {
    name: 'courseId',
    // select, autosuggest, textarea or input
    as: 'autosuggest',
    label: 'Course Name',
    description: 'Please select one of your courses from the list below',
    // prop when 'as' property is 'select'
    // This properties come from API or Constants
    options: adaptOptions(availableUserCourses)?.sort((a, b) => {
      if (a.label.toLowerCase() > b.label.toLowerCase()) { return 1; }
      if (a.label.toLowerCase() < b.label.toLowerCase()) { return -1; }
      return 0;
    }),
  },
  {
    name: 'validationBodyId',
    as: 'autosuggest',
    label: 'Validation Body',
    description: 'Please select the applicable validation body for your course',
    options: adaptOptions(availableValidationBodies),
  },
  {
    name: 'categoryId',
    // When is needed category as array
    // isArray: true,
    as: 'autosuggest',
    label: 'Category',
    description: 'Please select the appropriate category for your course',
    options: adaptOptions(availableCourseCategories),
  },
  {
    name: 'comment',
    as: 'textarea',
    label: 'Comments',
    description: 'Type any comment or explanation for your course',
  },
]);
