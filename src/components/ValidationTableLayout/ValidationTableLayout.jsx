import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  Spinner, Stack, Tab, Tabs,
} from '@edx/paragon';

import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { REQUEST_STATUS } from '../../data/constants';
import { getLastAndFirstValidationProcessEvents, PENDING_STATUSES } from '../../utils/helpers';

import { ValidationTable } from '../ValidationTable';
import { getAvailableValidationProcesses } from '../../data/slices';
import { getPermissionBasedData } from './helpers';

const ValidationTableLayout = ({ isValidator }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAvailableValidationProcesses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: availableValidationProcesses, loadStatus } = useSelector((state) => (
    state.validationRecord.availableValidationProcesses
  ));
  const areValidationProcessesLoading = loadStatus === REQUEST_STATUS.LOADING;
  const dataToRender = getPermissionBasedData(availableValidationProcesses, isValidator);

  const tabItems = [
    {
      name: 'pending',
      label: <FormattedMessage id="validation.layout.pending.tab" defaultMessage="Pending Courses" description="Tab to show the courses pending to review" />,
      component: (
        <ValidationTable
          isLoading={areValidationProcessesLoading}
          data={dataToRender.filter((course) => {
            const [lastValidationProcessEvent] = getLastAndFirstValidationProcessEvents(course);
            return PENDING_STATUSES.includes(lastValidationProcessEvent?.status);
          })}
        />
      ),
    },
    {
      name: 'archived',
      label: <FormattedMessage id="validation.layout.archived.tab" defaultMessage="Archived Courses" description="Tab to show the courses which has a finished review" />,
      component: (
        <ValidationTable
          isLoading={areValidationProcessesLoading}
          data={dataToRender.filter((course) => {
            const [lastValidationProcessEvent] = getLastAndFirstValidationProcessEvents(course);
            return !PENDING_STATUSES.includes(lastValidationProcessEvent?.status);
          })}
        />
      ),
    },
  ];

  return (
    <div>
      {
        (areValidationProcessesLoading && !dataToRender.length) ? (
          <Stack className="my-6 align-items-center">
            <Spinner
              variant="brand"
              animation="grow"
              screenReaderText={(
                <span className="sr-only">
                  <FormattedMessage
                    id="validation.layout.loading"
                    defaultMessage="Loading"
                    description="Loading message for spinner screenreader text."
                  />
                </span>
              )}
            />
          </Stack>
        )
          : (
            <div>
              {isValidator ? (
                <Tabs className="mb-4" variant="tabs">
                  {tabItems?.map((tab) => (
                    <Tab key={tab.name} eventKey={tab.name} title={tab.label}>
                      {tab.component}
                    </Tab>
                  ))}
                </Tabs>
              ) : (
                <ValidationTable
                  isLoading={areValidationProcessesLoading}
                  data={dataToRender}
                />
              )}
            </div>
          )
      }
    </div>
  );
};

ValidationTableLayout.propTypes = {
  isValidator: PropTypes.bool.isRequired,
};

export default ValidationTableLayout;
