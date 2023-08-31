import { injectIntl, useIntl } from '@edx/frontend-platform/i18n';
import { Button, Stack, useToggle } from '@edx/paragon';

import { Header, SubmitCourseForValidation, ValidationTableView } from './components';

import messages from './messages';
import infoMockedFilled from './data/mocked_data';

const ValidationPanelPage = ({ intl }) => {
  const [isOpenSubmitACourseModal, openSubmitACourseModal, closeSubmitACourseModal] = useToggle(false);
  const isValidator = localStorage.getItem('isValidator') === 'true';

  return (
    <>
      <SubmitCourseForValidation isOpen={isOpenSubmitACourseModal} close={closeSubmitACourseModal} />

      <Stack gap={3} className="bg-secondary-100">
        <Header intl={intl} />
        <main className="container">
          <Stack direction="horizontal" className="m-5 justify-content-between">
            <h1>{intl.formatMessage(messages.heading)}</h1>
            {!isValidator && <Button onClick={() => openSubmitACourseModal(true)} variant="brand">Submit a course for validation</Button>}
          </Stack>
          <ValidationTableView data={infoMockedFilled} />
        </main>
      </Stack>
    </>
  );
};

ValidationPanelPage.propTypes = {
  intl: useIntl.isRequired,
};

export default injectIntl(ValidationPanelPage);
