import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  409: {
    id: 'pop.up.message.409.error',
    defaultMessage: 'The validation process for this course is already underway.',
    description: 'Message displayed when the API response with a 409 error',
  },
  400: {
    id: 'pop.up.message.400.error',
    defaultMessage: 'This action cannot be completed at the moment. Please try refreshing the page and try again.',
    description: 'Message displayed when the API response with a 400 error',
  },
  401: {
    id: 'pop.up.message.401.error',
    defaultMessage: 'You are not authorized to execute this action.',
    description: 'Message displayed when the API response with a 401 error',
  },
  404: {
    id: 'pop.up.message.404.error',
    defaultMessage: 'There was an error trying to find the register you are looking for.',
    description: 'Message displayed when the API response with a 404 error',
  },
  500: {
    id: 'pop.up.message.500.error',
    defaultMessage: 'An unknown error occurred. Please try again later.',
    description: 'Message displayed when the API response with a 500 error',
  },
});

export default messages;
