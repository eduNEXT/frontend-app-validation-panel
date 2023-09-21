import { useIntl } from '@edx/frontend-platform/i18n';
import { Button, Stack, useToggle } from '@edx/paragon';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CourseValidationRequestForm, Header, ValidationTableLayout } from './components';

import messages from './messages';
import { getCurrentUserInfo } from './data/slices/userInfoSlice';

const ValidationPanelPage = () => {
  const [isOpen, open, close] = useToggle(false);
  const intl = useIntl();

  const dispatch = useDispatch();
  const isValidator = useSelector((state) => state.userInfo.userInfo.isValidator);
  useEffect(() => {
    dispatch(getCurrentUserInfo());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
