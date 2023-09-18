import { useIntl } from '@edx/frontend-platform/i18n';
import { Button, Stack, useToggle } from '@edx/paragon';

import { CourseValidationRequestForm, Header, ValidationTableLayout } from './components';

import messages from './messages';

const ValidationPanelPage = () => {
  const [isOpen, open, close] = useToggle(false);
  const intl = useIntl();
  const isValidator = false;

  return (
    <>
      <CourseValidationRequestForm isOpen={isOpen} close={close} />
      <main className="bg-secondary-100" style={{ minHeight: '100vh' }}>
        <Header intl={intl} />
        <div className="container-lg">
          <Stack direction="horizontal" className="my-5 justify-content-between">
            <h1>{intl.formatMessage(messages.heading)}</h1>
            {!isValidator && <Button onClick={open} variant="brand">{intl.formatMessage(messages.newRecordCreatorButton)}</Button>}
          </Stack>
          <ValidationTableLayout isValidator={isValidator} />
        </div>
      </main>
    </>
  );
};

export default ValidationPanelPage;
