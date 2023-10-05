import { adaptOptions } from '../../utils/helpers';

export const getAdaptedData = (formData, availableCourseCategories) => ({
  ...formData,
  categoryIds: formData.categoryIds.map((categoryName) => (
    availableCourseCategories.find(category => category.name === categoryName).id)),
});

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
      if (a.label > b.label) { return 1; }
      if (a.label < b.label) { return -1; }
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
    name: 'categoryIds',
    isArray: true,
    as: 'select',
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
