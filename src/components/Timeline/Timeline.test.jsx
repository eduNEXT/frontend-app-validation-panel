import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import Timeline from './Timeline';

const mockEvents = [
  {
    status: 'subm',
    createdAt: '2023-08-10',
    reason: null,
    comment: 'This is another comment of the course author',
    user: 'Course Author 2',
    validationBody: 'Validator Body #1',

  },
  {
    status: 'aprv',
    createdAt: '2023-08-20',
    reason: null,
    comment: 'This is the comment of Validator 2',
    user: 'Validator 2',
  },
];

const mockData = { pastProcessEvents: mockEvents, validationBody: { name: 'Validator Body #1' } };

const renderComponent = (props) => render(
  <IntlProvider locale="en">
    <Timeline {...props} />
  </IntlProvider>,
);

describe('Timeline', () => {
  const mockCreatedAt = new Date(mockEvents[0].createdAt);
  const formatedMockDate = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' }).format(mockCreatedAt);

  it('should create a list items to display the past process events information', () => {
    const { container, getByText, getAllByText } = renderComponent(mockData);

    expect(container.querySelectorAll('li').length).toBe(2);
    expect(getByText(formatedMockDate, { exact: false })).toBeInTheDocument();
    expect(getByText(mockEvents[0].comment, { exact: false })).toBeInTheDocument();
    screen.debug();
    expect(getByText(mockEvents[0].status, { exact: false })).toBeInTheDocument();
    expect(getAllByText(mockData.validationBody.name, { exact: false }).length).toBe(2);
  });

  it('should not render the top line when is the first element', () => {
    const { container } = renderComponent(mockData);
    expect(container.querySelector('ul').firstChild.querySelector('.record-line-top')).not.toBeInTheDocument();
  });

  it('should not render bottom divider when it is the last element', () => {
    const { container } = renderComponent(mockData);
    expect(container.querySelector('ul').lastChild.querySelector('article').className).toBe('mb-3 pb-4');
  });
});
