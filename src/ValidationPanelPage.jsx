import { injectIntl, useIntl } from '@edx/frontend-platform/i18n';
import { Button, Stack } from '@edx/paragon';

import { Header, ValidationTableLayout } from './components';

import messages from './messages';

const ValidationPanelPage = ({ intl }) => {
  const isValidator = true;

  return (
    <Stack gap={3} className="bg-secondary-100">
      <Header intl={intl} />
      <main className="container">
        <Stack direction="horizontal" className="my-4 justify-content-between">
          <h1>{intl.formatMessage(messages.heading)}</h1>
          {!isValidator && <Button variant="brand">Submit a course for validation</Button>}
        </Stack>
        <ValidationTableLayout isValidator={isValidator} />
      </main>
    </Stack>
  );
};

ValidationPanelPage.propTypes = {
  intl: useIntl.isRequired,
};

export default injectIntl(ValidationPanelPage);
