import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  CourseValidationFormTitle: {
    id: 'course.validation.request.form.title',
    defaultMessage: 'Submit a course for validation',
    description: 'Title of the course validation request form',
  },
  descriptionSelectCourse: {
    id: 'course.validation.request.form.description.course',
    defaultMessage: 'Please select one of your courses from the list below',
    description: 'Description display in the course select',
  },
  feedbackSelectCourse: {
    id: 'course.validation.request.form.feedback.course',
    defaultMessage: 'Please select a course',
    description: 'Feedback display in the course select',
  },
  descriptionSelectValidationBody: {
    id: 'course.validation.request.form.description.validation.body',
    defaultMessage: 'Please select the applicable validation body for your course',
    description: 'Description display in the validation body select',
  },
  feedbackSelectValidationBody: {
    id: 'course.validation.request.form.feedback.validation.body',
    defaultMessage: 'Please select a validation body',
    description: 'Feedback display in the validation body select',
  },
  descriptionSelectCategory: {
    id: 'course.validation.request.form.description.category',
    defaultMessage: 'Please select the appropriate category for your course',
    description: 'Description display in the category select',
  },
  feedbackSelectCategory: {
    id: 'course.validation.request.form.feedback.category',
    defaultMessage: 'Please select a category',
    description: 'Feedback display in the category select',
  },
  descriptionComment: {
    id: 'course.validation.request.form.description.comment',
    defaultMessage: 'Type any comment or explanation for your course',
    description: 'Description display in the description input',
  },
});

export default messages;
