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
      <Stack gap={3} className="bg-secondary-100">
        <Header intl={intl} />
        <main className="container">
          <Stack direction="horizontal" className="my-4 justify-content-between">
            <h1>{intl.formatMessage(messages.heading)}</h1>
            {!isValidator && <Button onClick={open} variant="brand">{intl.formatMessage(messages.newRecordCreatorButton)}</Button>}
          </Stack>
          <ValidationTableLayout isValidator={isValidator} />
        </main>
      </Stack>
    </>
  );
};

export default ValidationPanelPage;
