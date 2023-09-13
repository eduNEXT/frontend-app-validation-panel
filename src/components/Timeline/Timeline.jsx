import PropTypes from 'prop-types';
import RecordItem from './RecordItem';

const Timeline = ({ pastProcessEvents, validationBody }) => (
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

Timeline.propTypes = {
  pastProcessEvents: PropTypes.arrayOf(Object),
  validationBody: PropTypes.string.isRequired,
};

Timeline.defaultProps = {
  pastProcessEvents: [],
};

export default Timeline;
