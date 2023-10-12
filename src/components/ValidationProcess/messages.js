import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  exemptMessage: {
    id: 'validation.process.exempt.message',
    defaultMessage: 'This course is automatically approved without undergoing a validation process, as it belongs to an exempt organization.',
    description: 'Message to indicate a course not need a validation process to be published',
  },
  validatorCheckbox: {
    id: 'validation.process.validator.checkbox',
    defaultMessage: 'Click here to confirm that you have reviewed the content in STUDIO.',
    description: 'Checkbox to confirm a course has been reviewed by a validator',
  },
  studioLink: {
    id: 'validation.process.studio.link',
    defaultMessage: 'View course in Studio.',
    description: 'Indicate the link to the course in studio',
  },
  validatorReviewStartDate: {
    id: 'validation.process.validator.review.start.date',
    defaultMessage: 'Review start date',
    description: 'Indicate the initial date for the validation review',
  },
  validatorReviewComments: {
    id: 'validation.process.validator.review.comments',
    defaultMessage: 'Additional comments',
    description: 'Additional comments from the validation review',
  },
  feedbackSelectStatus: {
    id: 'validation.process.validator.review.feedback.status',
    defaultMessage: 'Please select a status',
    description: 'Feedback display in the status select',
  },
  feedbackSelectReason: {
    id: 'validation.process.validator.review.feedback.reason',
    defaultMessage: 'Please select a rejection reason',
    description: 'Feedback display in the rejection reason select',
  },
  feedbackComment: {
    id: 'validation.process.validator.review.feedback.comment',
    defaultMessage: 'Please insert at least a short description about your review',
    description: 'Feedback display in the comment input',
  },
  submissionComments: {
    id: 'validation.process.course.submission.comments',
    defaultMessage: 'Submission comments',
    description: 'Additional information included during the submission of a course for validation',
  },
  submissionDate: {
    id: 'validation.process.course.submission.date',
    defaultMessage: 'Submission date',
    description: 'Date of the submission of a course for validation',
  },
  reviewer: {
    id: 'validation.process.course.submission.reviewer',
    defaultMessage: 'Reviewer',
    description: 'Identify the current reviewer',
  },
});

export default messages;
