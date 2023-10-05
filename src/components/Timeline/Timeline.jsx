import PropTypes from 'prop-types';
import RecordItem from './RecordItem';

const Timeline = ({ pastProcessEvents, validationBody, availableReasons }) => (
  <ul className="px-2">
    {pastProcessEvents.map((processEvent, index) => {
      const processEventWithReasonName = {
        ...processEvent,
        reason: availableReasons?.find((reason) => reason.id === processEvent?.reason)?.name,
      };
      return (
        <RecordItem
          key={`validationEvent-${processEvent.createdAt}-${processEvent.user}`}
          {...processEventWithReasonName}
          validationBody={validationBody}
          first={index === 0}
          last={index === pastProcessEvents.length - 1}
        />
      );
    })}
  </ul>
);

Timeline.propTypes = {
  pastProcessEvents: PropTypes.arrayOf(Object),
  validationBody: PropTypes.string.isRequired,
  availableReasons: PropTypes.arrayOf(
    PropTypes.shape(
      {
        name: PropTypes.string,
        id: PropTypes.number,
      },
    ),
  ),
};

Timeline.defaultProps = {
  pastProcessEvents: [],
  availableReasons: [],
};

export default Timeline;
