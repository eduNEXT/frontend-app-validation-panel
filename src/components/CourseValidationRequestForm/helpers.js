export const adaptOptions = (optionsToAdapt) => optionsToAdapt?.map((option) => ({ key: option.name.replaceAll(' ', ''), id: option.id, label: option.name }));

export const getCourseValidationRequestForm = (
  availableUserCourses,
  availableCourseCategories,
  availableValidationBodies,
) => ([
  {
    name: 'courseId',
    // select, textarea or input
    as: 'select',
    label: 'Course Name',
    description: 'Please select one of your courses from the list below',
    // prop when 'as' property is 'select'
    // This properties come from API or Constants
    options: adaptOptions(availableUserCourses),
  },
  {
    name: 'validationBodyId',
    as: 'select',
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
