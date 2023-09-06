import PropTypes from 'prop-types';
import { Tab, Tabs } from '@edx/paragon';

import { VALIDATION_STATUS } from '../../data/constants';
import { getLastAndFirstValidationProcessEvents } from '../../utils/helpers';

import infoMockedFilled from '../../data/mocked_data';
import { ValidationTable } from '../ValidationTable';

const ValidationTableLayout = ({ isValidator }) => {
  const pendingStatuses = [VALIDATION_STATUS.IN_REVIEW, VALIDATION_STATUS.SUBMITTED];

  const ValidationTableTabs = [
    {
      name: 'pending',
      label: 'Pending Courses',
      component: (
        <ValidationTable
          data={infoMockedFilled.filter((course) => {
            const [lastValidationProcessEvent] = getLastAndFirstValidationProcessEvents(course);
            return pendingStatuses.includes(lastValidationProcessEvent.status);
          })}
        />
      ),
    },
    {
      name: 'archived',
      label: 'Archived Courses',
      component: (
        <ValidationTable
          data={infoMockedFilled.filter((course) => {
            const [lastValidationProcessEvent] = getLastAndFirstValidationProcessEvents(course);
            return !pendingStatuses.includes(lastValidationProcessEvent.status);
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
        <ValidationTable data={infoMockedFilled} />
      )}
    </div>
  );
};

ValidationTableLayout.propTypes = {
  isValidator: PropTypes.bool.isRequired,
};

export default ValidationTableLayout;
