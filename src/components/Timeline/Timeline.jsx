import PropTypes from 'prop-types';
import RecordItem from './RecordItem';

const Timeline = ({ passProcessEvents, validationBody }) => (
  <ul className="px-2">
    {passProcessEvents.map((processEvent, index) => (
      <RecordItem
        key={`validationEvent-${processEvent.createdAt}-${processEvent.user}`}
        {...processEvent}
        validationBody={validationBody}
        first={index === 0}
        last={index === passProcessEvents.length - 1}
      />
    ))}
  </ul>
);

Timeline.propTypes = {
  passProcessEvents: PropTypes.arrayOf(Object),
  validationBody: PropTypes.string.isRequired,
};

Timeline.defaultProps = {
  passProcessEvents: [],
};

export default Timeline;
