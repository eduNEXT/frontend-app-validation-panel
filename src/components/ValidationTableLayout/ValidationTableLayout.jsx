import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Tab, Tabs } from '@edx/paragon';

import { VALIDATION_STATUS } from '../../data/constants';
import { getLastAndFirstValidationProcessEvents } from '../../utils/helpers';

import { ValidationTable } from '../ValidationTable';
import { getAvailableValidationProcesses } from '../../data/slices';

const ValidationTableLayout = ({ isValidator }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAvailableValidationProcesses());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const availableValidationProcesses = useSelector((state) => (
    state.validationRecord.availableValidationProcesses));

  const pendingStatuses = [VALIDATION_STATUS.IN_REVIEW, VALIDATION_STATUS.SUBMITTED];

  const ValidationTableTabs = [
    {
      name: 'pending',
      label: 'Pending Courses',
      component: (
        <ValidationTable
          data={availableValidationProcesses.data.results?.filter((course) => {
            const [lastValidationProcessEvent] = getLastAndFirstValidationProcessEvents(course);
            return pendingStatuses.includes(lastValidationProcessEvent?.status);
          })}
        />
      ),
    },
    {
      name: 'archived',
      label: 'Archived Courses',
      component: (
        <ValidationTable
          data={availableValidationProcesses.data.results?.filter((course) => {
            const [lastValidationProcessEvent] = getLastAndFirstValidationProcessEvents(course);
            return !pendingStatuses.includes(lastValidationProcessEvent?.status);
          })}
        />
      ),
    },
  ];

  return (
    <div>
      {isValidator ? (
        <Tabs className="mb-4" variant="tabs">
          {ValidationTableTabs.map((tab) => (
            <Tab eventKey={tab.name} title={tab.label}>
              {tab.component}
            </Tab>
          ))}
        </Tabs>
      ) : (
        <ValidationTable
          data={availableValidationProcesses.data.results}
        />
      )}
    </div>
  );
};

ValidationTableLayout.propTypes = {
  isValidator: PropTypes.bool.isRequired,
};

export default ValidationTableLayout;
