import { render } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import RecordItem from './RecordItem';

const mockData = {
  comment: 'This is the comment of Validator 2',
  createdAt: '2023-08-10',
  reason: 'This course is completed',
  status: 'Approved',
  validationBody: 'Validator Body #2',
};

const renderComponent = (props) => render(
  <IntlProvider locale="en">
    <RecordItem {...props} />
  </IntlProvider>,
);

describe('RecordItem', () => {
  const mockCreatedAt = new Date(mockData.createdAt);
  const formatedMockDate = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' }).format(mockCreatedAt);

  it('should create a list item to display the validation record information', () => {
    const { getByText } = renderComponent(mockData);

    expect(getByText(formatedMockDate, { exact: false })).toBeInTheDocument();
    expect(getByText(mockData.comment, { exact: false })).toBeInTheDocument();
    expect(getByText(mockData.reason, { exact: false })).toBeInTheDocument();
    expect(getByText(mockData.status, { exact: false })).toBeInTheDocument();
    expect(getByText(mockData.validationBody, { exact: false })).toBeInTheDocument();
  });

  it('should not render the top line when is the first element', () => {
    const { container } = renderComponent({ ...mockData, first: true });
    expect(container.querySelector('.record-line-top')).not.toBeInTheDocument();
  });

  it('should not render bottom divider when it is the last element', () => {
    const { container } = renderComponent({ ...mockData, last: true });
    expect(container.querySelector('article').className).toBe('mb-3 pb-4');
  });
});
