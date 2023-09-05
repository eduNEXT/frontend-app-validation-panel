import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import RecordItem from './RecordItem';

const Timeline = ({ validationBody }) => {
  const pastProcessEvents = useSelector((state) => state.currentValidationRecord.validation_process_events);

  return (
    <ul className="px-2">
      {pastProcessEvents.map((processEvent, index) => (
        <RecordItem
          key={`validationEvent-${processEvent.createdAt}-${processEvent.user}`}
          {...processEvent}
          validationBody={validationBody}
          first={index === 0}
          last={index === pastProcessEvents.length - 1}
        />
      ))}
    </ul>
  );
};

Timeline.propTypes = {
  passProcessEvents: PropTypes.arrayOf(Object),
  validationBody: PropTypes.string.isRequired,
};

Timeline.defaultProps = {
  passProcessEvents: [],
};

export default Timeline;
