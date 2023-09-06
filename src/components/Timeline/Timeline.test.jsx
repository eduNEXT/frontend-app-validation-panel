import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import Timeline from './Timeline';
import { initializeStore } from '../../data/store';
import mockedValidationProcesses from '../../data/mocked_data';

const testStore = initializeStore({ currentValidationRecord: mockedValidationProcesses[0] });
const mockEvents = testStore.getState().currentValidationRecord.validationProcessEvents;
const mockData = { validationBody: testStore.getState().currentValidationRecord.validationBody };

const renderComponent = () => render(
  <Provider store={testStore}>
    <IntlProvider locale="en">
      <Timeline />
    </IntlProvider>
  </Provider>,
);

describe('Timeline', () => {
  const mockCreatedAt = new Date(mockEvents[0].createdAt);
  const formatedMockDate = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' }).format(mockCreatedAt);

  it('should create a list items to display the past process events information', () => {
    const { container, getByText, getAllByText } = renderComponent();

    expect(container.querySelectorAll('li').length).toBe(2);
    expect(getByText(formatedMockDate, { exact: false })).toBeInTheDocument();
    expect(getByText(mockEvents[0].comment, { exact: false })).toBeInTheDocument();
    expect(getByText(mockEvents[0].status, { exact: false })).toBeInTheDocument();
    expect(getAllByText(mockData.validationBody, { exact: false }).length).toBe(2);
  });

  it('should not render the top line when is the first element', () => {
    const { container } = renderComponent();
    expect(container.querySelector('ul').firstChild.querySelector('.record-line-top')).not.toBeInTheDocument();
  });

  it('should not render bottom divider when it is the last element', () => {
    const { container } = renderComponent();
    expect(container.querySelector('ul').lastChild.querySelector('article').className).toBe('mb-3 pb-4');
  });
});
