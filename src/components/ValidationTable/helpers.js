/* eslint-disable import/prefer-default-export */
export const getTabsInfo = (validationProcessComponent, pastProcessesComponent) => ([
  {
    name: 'validation_process',
    label: 'Validation process',
    // Replace this with the actual component to show
    component: validationProcessComponent,
  },
  {
    name: 'past_processes',
    label: 'Past process(es)',
    // Replace this with the actual component to show
    component: pastProcessesComponent,
  },
]);
