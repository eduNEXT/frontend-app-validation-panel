import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Button, Spinner, Stack, useToggle,
} from '@edx/paragon';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CourseValidationRequestForm, Header, PopUpMessage, ValidationTableLayout,
} from './components';

import messages from './messages';
import { getAvailableRejectionReasons, getCurrentUserInfo } from './data/slices';
import { REQUEST_STATUS } from './data/constants';

const ValidationPanelPage = () => {
  const [isOpen, open, close] = useToggle(false);
  const intl = useIntl();

  const dispatch = useDispatch();
  const { isValidator, loadStatus } = useSelector((state) => state.userInfo.userInfo);
  useEffect(() => {
    dispatch(getCurrentUserInfo());
    dispatch(getAvailableRejectionReasons());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoadingUserInfo = isValidator === null || loadStatus === REQUEST_STATUS.LOADING;

  return (
    <>
      <PopUpMessage />
      <CourseValidationRequestForm isOpen={isOpen} close={close} />
      <main className="bg-secondary-100" style={{ minHeight: '100vh' }}>
        <Header intl={intl} />
        {isLoadingUserInfo
          ? (
            <Stack className="my-6 align-items-center">
              <Spinner variant="brand" animation="grow" screenReaderText="loading" />
            </Stack>
          )
          : (
            <div className="container-lg">
              <Stack direction="horizontal" className="my-5 justify-content-between">
                <h1>{intl.formatMessage(messages.heading)}</h1>
                {!isValidator && <Button onClick={open} variant="brand">{intl.formatMessage(messages.newRecordCreatorButton)}</Button>}
              </Stack>
              <ValidationTableLayout
                isValidator={isValidator}
              />
            </div>
          )}
      </main>
    </>
  );
};

export default ValidationPanelPage;
