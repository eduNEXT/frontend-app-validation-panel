import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  Spinner, Stack, Tab, Tabs,
} from '@edx/paragon';

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
      label: 'Pending Courses',
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
      label: 'Archived Courses',
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
            <Spinner variant="brand" animation="grow" screenReaderText="loading" />
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
