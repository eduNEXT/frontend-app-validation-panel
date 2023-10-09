import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  heading: {
    id: 'validation.panel.heading',
    defaultMessage: 'Validation Panel',
    description: 'Application title',
  },
  validatorTitle: {
    id: 'validation.panel.validator.title',
    defaultMessage: 'Course validation processes',
    description: 'Subtitle applied for validator',
  },
  courseAutorTitle: {
    id: 'validation.panel.course.author.title',
    defaultMessage: 'My course validation processes',
    description: 'Subtitle applied for course author',
  },
  goBack: {
    id: 'validation.panel.goBack.button',
    defaultMessage: 'Go back',
    description: 'Alt text for returning button',
  },
  newRecordCreatorButton: {
    id: 'validation.panel.new.record.creator.button',
    defaultMessage: 'Submit a course for validation',
    description: 'Label for the create new validation process action',
  },
});

export default messages;
