import PropTypes from 'prop-types';
import { FormattedDate, FormattedMessage } from '@edx/frontend-platform/i18n';

const bold = (str) => <b>{str}</b>;

const RecordItem = ({
  // eslint-disable-next-line camelcase
  created_at,
  status,
  validationBody,
  reason,
  comment,
  first,
  last,
}) => (
  <li className="record-item pb-4 px-5">
    {/* Top Line */}
    {!first && <div className="record-line-top bg-gray-200" />}

    {/* Dot */}
    <div className="record-dot bg-gray-200" />

    {/* Bottom Line */}
    <div className="record-line-bottom bg-gray-200" />

    {/* Record */}
    <article
      className={`${last ? '' : 'border-bottom border-gray-100 '}mb-3 pb-4`}
    >
      <section className="small text-right text-gray-400 float-right mt-1">
        <FormattedMessage
          id="record.item.validation.date"
          defaultMessage="Validation date: {date}"
          description="date when the record was created"
          values={{
            date: (
              <FormattedDate
                // eslint-disable-next-line camelcase
                value={created_at}
                day="numeric"
                month="short"
                year="numeric"
              />
            ),
          }}
        />
      </section>
      <section>
        <div>
          <FormattedMessage
            id="record.item.validation.status"
            defaultMessage="<b>Status</b>: {status}"
            description="status of the record"
            tagName="div"
            values={{
              b: bold,
              status,
            }}
          />
          <FormattedMessage
            id="record.item.validation.body"
            defaultMessage="<b>Validator body</b>: {validationBody}"
            description="identify who was in charge to validate the course"
            tagName="div"
            values={{
              b: bold,
              validationBody,
            }}
          />
          <FormattedMessage
            id="record.item.validation.reason"
            defaultMessage="Reason: "
            description="identify who was in charge to validate the course"
            tagName="b"
          />
          {reason}
        </div>
        <div className="mt-2">
          <FormattedMessage
            id="record.item.validation.comment"
            defaultMessage="Comments: "
            description="Shown the label for additional information left for the validator"
            tagName="b"
          />
          {comment}
        </div>
      </section>
    </article>
  </li>
);

RecordItem.propTypes = {
  created_at: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  validationBody: PropTypes.string.isRequired,
  reason: PropTypes.string,
  comment: PropTypes.string,
  first: PropTypes.bool,
  last: PropTypes.bool,
};

RecordItem.defaultProps = {
  comment: null,
  reason: null,
  first: false,
  last: false,
};

export default RecordItem;
