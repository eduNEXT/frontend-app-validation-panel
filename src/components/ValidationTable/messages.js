import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  notResults: {
    id: 'validation.table.not.results',
    defaultMessage: 'Not available validation processes',
    description: 'Text shown when there are not validation processes',
  },
  validationProcesDescription: {
    id: 'validation.table.modal.description.tab',
    defaultMessage: 'Validation process',
    description: 'Tab to show the informacion about the current validation process',
  },
  validationProcessPastEvents: {
    id: 'validation.table.modal.past.event.tab',
    defaultMessage: 'Past events',
    description: 'Tab to show the past events related to the current validation process',
  },
  actionColumn: {
    id: 'validation.table.action.column',
    defaultMessage: 'Action',
    description: 'Header for the actions column',
  },
  typeaheadFilterPlaceholder: {
    id: 'validation.table.typeahead.placeholder',
    defaultMessage: 'Find {filterField}',
    description: 'Placeholder shown in the input for filters',
  },
});

export default messages;
