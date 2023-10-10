import PropTypes from 'prop-types';
import { FormattedDate, FormattedMessage } from '@edx/frontend-platform/i18n';
import { VALIDATION_STATUS, VALIDATION_STATUS_LABEL } from '../../data/constants';

const bold = (str) => <b>{str}</b>;

const RecordItem = ({
  createdAt,
  status,
  validationBody,
  reason,
  comment,
  first,
  last,
  user,
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
          description="Date when the record was created"
          values={{
            date: (
              <FormattedDate
                value={createdAt}
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
            description="Status of the record"
            tagName="div"
            values={{
              b: bold,
              status: VALIDATION_STATUS_LABEL[status],
            }}
          />
          <FormattedMessage
            id="record.item.validation.reportedBy"
            defaultMessage="<b>Reported by</b>: {user}"
            description="Identify who reported the record"
            tagName="div"
            values={{
              b: bold,
              user,
            }}
          />
          <FormattedMessage
            id="record.item.validation.body"
            defaultMessage="<b>Validator body</b>: {validationBody}"
            description="Identify the validation body in charge to validate the course"
            tagName="div"
            values={{
              b: bold,
              validationBody,
            }}
          />
          {status === VALIDATION_STATUS.DISAPPROVED && (
            <div>
              <FormattedMessage
                id="record.item.validation.reason"
                defaultMessage="Reason: "
                description="Identify the reason to reject the course"
                tagName="b"
              />
              {reason}
            </div>
          )}
        </div>
        <div className="mt-2">
          <FormattedMessage
            id="record.item.validation.comment"
            defaultMessage="Info: "
            description="Shown additional information left for the record reporter"
            tagName="b"
          />
          {comment}
        </div>
      </section>
    </article>
  </li>
);

RecordItem.propTypes = {
  createdAt: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  validationBody: PropTypes.string.isRequired,
  reason: PropTypes.string,
  comment: PropTypes.string,
  first: PropTypes.bool,
  last: PropTypes.bool,
  user: PropTypes.string,
};

RecordItem.defaultProps = {
  comment: null,
  reason: null,
  first: false,
  last: false,
  user: '',
};

export default RecordItem;
