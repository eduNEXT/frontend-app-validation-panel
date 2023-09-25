import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Tab, Tabs } from '@edx/paragon';

import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
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
  const courseIdsCurrentUserIsReviewing = availableValidationProcesses.reduce(
    (currentIds, validationProcess) => (
      validationProcess.currentValidationUser?.id === getAuthenticatedUser().userId
        ? [...currentIds, validationProcess.courseId]
        : currentIds
    ),
    [

    ],
  );
  const dataToRender = getPermissionBasedData(availableValidationProcesses, isValidator);

  const tabItems = [
    {
      name: 'pending',
      label: 'Pending Courses',
      component: (
        <ValidationTable
          courseIdsCurrentUserIsReviewing={courseIdsCurrentUserIsReviewing}
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
          courseIdsCurrentUserIsReviewing={courseIdsCurrentUserIsReviewing}
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
      {isValidator ? (
        <Tabs className="mb-4" variant="tabs">
          {tabItems.map((tab) => (
            <Tab key={tab.name} eventKey={tab.name} title={tab.label}>
              {tab.component}
            </Tab>
          ))}
        </Tabs>
      ) : (
        <ValidationTable
          courseIdsCurrentUserIsReviewing={courseIdsCurrentUserIsReviewing}
          isLoading={areValidationProcessesLoading}
          data={dataToRender}
        />
      )}
    </div>
  );
};

ValidationTableLayout.propTypes = {
  isValidator: PropTypes.bool.isRequired,
};

export default ValidationTableLayout;
