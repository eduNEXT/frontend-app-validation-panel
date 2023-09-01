import { injectIntl, useIntl } from '@edx/frontend-platform/i18n';
import { Button, Stack } from '@edx/paragon';

import { Header, ValidationTable } from './components';

import messages from './messages';
import infoMockedFilled from './data/mocked_data';

const ValidationPanelPage = ({ intl }) => (
  <Stack gap={3} className="bg-secondary-100">
    <Header intl={intl} />
    <main className="container">
      <Stack direction="horizontal" className="m-5 justify-content-between">
        <h2>{intl.formatMessage(messages.heading)}</h2>
        <Button variant="brand">Submit a course for validation</Button>
      </Stack>
      <ValidationTable data={infoMockedFilled} />
    </main>
  </Stack>
);

ValidationPanelPage.propTypes = {
  intl: useIntl.isRequired,
};

export default injectIntl(ValidationPanelPage);
