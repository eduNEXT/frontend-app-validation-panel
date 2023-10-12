/* eslint-disable import/prefer-default-export */
import { adaptOptions } from '../../utils/helpers';
import globalMessages from '../../messages';
import messages from './messages';

export const getCourseValidationRequestForm = (
  availableUserCourses,
  availableCourseCategories,
  availableValidationBodies,
  intl,
) => ([
  {
    name: 'courseId',
    // select, autosuggest, textarea or input
    as: 'autosuggest',
    label: intl.formatMessage(globalMessages.courseName),
    description: intl.formatMessage(messages.descriptionSelectCourse),
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
    label: intl.formatMessage(globalMessages.validationBody),
    description: intl.formatMessage(messages.descriptionSelectValidationBody),
    options: adaptOptions(availableValidationBodies),
  },
  {
    name: 'categoryId',
    // When is needed category as array
    // isArray: true,
    as: 'autosuggest',
    label: intl.formatMessage(globalMessages.categories),
    description: intl.formatMessage(messages.descriptionSelectCategory),
    options: adaptOptions(availableCourseCategories),
  },
  {
    name: 'comment',
    as: 'textarea',
    label: intl.formatMessage(globalMessages.comment),
    description: intl.formatMessage(messages.descriptionComment),
  },
]);
