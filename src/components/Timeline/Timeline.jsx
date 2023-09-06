import { useSelector } from 'react-redux';

import RecordItem from './RecordItem';

const Timeline = () => {
  const currentValidationRecord = useSelector((state) => state.currentValidationRecord);

  return (
    <ul className="px-2">
      {currentValidationRecord.validationProcessEvents.map((processEvent, index) => (
        <RecordItem
          key={`validationEvent-${processEvent.createdAt}-${processEvent.user}`}
          {...processEvent}
          validationBody={currentValidationRecord.validationBody}
          first={index === 0}
          last={index === currentValidationRecord.validationProcessEvents.length - 1}
        />
      ))}
    </ul>
  );
};

export default Timeline;
