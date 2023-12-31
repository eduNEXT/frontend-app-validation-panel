import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Button, Spinner, Stack, useToggle,
} from '@edx/paragon';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StudioHeader } from '@edx/frontend-component-header';
import { StudioFooter } from '@edx/frontend-component-footer';

import {
  CourseValidationRequestForm, PopUpMessage, ValidationTableLayout,
} from './components';

import messages from './messages';
import {
  getAvailableRejectionReasons, getCurrentUserInfo, getAvailableValidationBodies,
  getCourseCategories,
  getAvailableOrganizations,
} from './data/slices';
import { REQUEST_STATUS } from './data/constants';

const ValidationPanelPage = () => {
  const [isOpen, open, close] = useToggle(false);
  const intl = useIntl();

  const dispatch = useDispatch();
  const { isValidator, loadStatus } = useSelector((state) => state.userInfo.userInfo);
  useEffect(() => {
    dispatch(getCurrentUserInfo());
    dispatch(getAvailableOrganizations());
    dispatch(getCourseCategories());
    dispatch(getAvailableValidationBodies());
    dispatch(getAvailableRejectionReasons());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoadingUserInfo = isValidator === null || loadStatus === REQUEST_STATUS.LOADING;

  return (
    <>
      <PopUpMessage />
      <CourseValidationRequestForm isOpen={isOpen} close={close} />
      <main className="bg-secondary-100" style={{ minHeight: '100vh' }}>
        <StudioHeader isHiddenMainMenu />
        {isLoadingUserInfo
          ? (
            <Stack className="my-6 align-items-center">
              <Spinner variant="brand" animation="grow" screenReaderText="loading" />
            </Stack>
          )
          : (
            <div className="container-lg">
              <Stack direction="horizontal" className="mt-5 mb-4 justify-content-between align-items-end">
                <div>
                  <h1>{intl.formatMessage(messages.heading)}</h1>
                  <h3 className="mt-5">{isValidator ? intl.formatMessage(messages.validatorTitle)
                    : intl.formatMessage(messages.courseAutorTitle)}
                  </h3>
                </div>
                {!isValidator && <Button onClick={open} variant="brand">{intl.formatMessage(messages.newRecordCreatorButton)}</Button>}
              </Stack>
              <ValidationTableLayout
                isValidator={isValidator}
              />
            </div>
          )}
        <StudioFooter />
      </main>
    </>
  );
};

export default ValidationPanelPage;
