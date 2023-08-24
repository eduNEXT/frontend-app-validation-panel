import React from 'react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import {
  Button, Stack,
} from '@edx/paragon';

import messages from './messages';
import ValidationsTableView from './components/ValidationsTableView';

import Header from './components/Header/Header';
import infoMockedFilled from './data/mocked_data';

const ValidationsPanelPage = ({ intl }) => (
  <Stack gap={3} className="bg-secondary-100">
    <Header intl={intl} />
    <main className="container">
      <Stack direction="horizontal" className="m-5 justify-content-between">
        <h2>{intl.formatMessage(messages.heading)}</h2>
        <Button variant="brand">Submit a course for validation</Button>
      </Stack>
      <ValidationsTableView data={infoMockedFilled} />
    </main>
  </Stack>
);

ValidationsPanelPage.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ValidationsPanelPage);
