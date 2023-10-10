import PropTypes from 'prop-types';
import { useState } from 'react';

import { getConfig } from '@edx/frontend-platform';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';
import { useSelector } from 'react-redux';
import { CheckCircle } from '@edx/paragon/icons';
import {
  Form, Icon, PageBanner, Stack,
} from '@edx/paragon';
import { ValidatorReview } from './ValidatorReview';
import { CourseSubmissionInfo } from './CourseSubmissionInfo';
import { getLastReviewEventInfo, getSubmissionInfo } from '../../utils/helpers';
import { isPendingCourse } from './helpers';
import messages from './messages';

const ValidationProcess = ({ courseSelected, onClose }) => {
  const intl = useIntl();
  const [isReviewConfirmed, setIsReviewConfirmed] = useState(false);
  const [openCollapsible, setOpenCollapsible] = useState(false);

  const handleChangeReviewConfirmation = () => {
    setOpenCollapsible(false);
    setIsReviewConfirmed((prevState) => !prevState);
  };

  const isValidator = useSelector((state) => state.userInfo.userInfo.isValidator);
  const availableReasons = useSelector((state) => state.rejectionReasons.data);

  const submissionInfo = getSubmissionInfo(
    { ...courseSelected, courseName: courseSelected?.courseName },
  );
  const isCourseExempted = !!submissionInfo.isExempted;

  const isPending = isPendingCourse(courseSelected);
  return (
    <>
      <div className="mb-4">
        <PageBanner show={isCourseExempted} variant="light">
          <Stack className="align-items-center" direction="horizontal" gap={3}>
            <Icon src={CheckCircle} />
            <span className="text-left">
              {intl.formatMessage(messages.exemptMessage)}
            </span>
          </Stack>
        </PageBanner>
      </div>

      <CourseSubmissionInfo
        isCollapsible={isValidator}
        collapsibleProps={{
          open: openCollapsible || !isReviewConfirmed,
          onToggle: () => setOpenCollapsible((prevState) => !prevState),
        }}
        submissionInfo={submissionInfo}
      />
      {(isValidator && !isCourseExempted && isPending) && (
        <Stack gap={3} className="my-4">
          <p>
            <FormattedMessage
              id="validation.process.studio.link.description"
              defaultMessage="Before validating the course, review the content {link}"
              description="link to redirect to studio"
              values={{
                link: (
                  <a
                    href={`${getConfig().STUDIO_BASE_URL}/course/${courseSelected.courseId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-900 muted-link"
                  >{intl.formatMessage(messages.studioLink)}
                  </a>
                ),
              }}
            />
          </p>
          <Form.Checkbox onChange={handleChangeReviewConfirmation} checked={isReviewConfirmed}>
            {intl.formatMessage(messages.validatorCheckbox)}
          </Form.Checkbox>
        </Stack>
      )}
      {!isCourseExempted && (
        <ValidatorReview
          onClose={onClose}
          courseId={courseSelected.courseId}
          isReviewConfirmed={isReviewConfirmed}
          lastReviewEventInfo={getLastReviewEventInfo(courseSelected, availableReasons)}
        />
      )}
    </>
  );
};

ValidationProcess.propTypes = {
  onClose: PropTypes.func,
  courseSelected: PropTypes.shape({
    courseName: PropTypes.string.isRequired,
    courseId: PropTypes.string.isRequired,
    organization: PropTypes.string.isRequired,
    categories: PropTypes.string.isRequired,
    validationBody: PropTypes.string.isRequired,
    validationProcessEvents: PropTypes.arrayOf({
      status: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      reason: PropTypes.number,
      comment: PropTypes.string,
      user: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

ValidationProcess.defaultProps = {
  onClose: null,
};

export default ValidationProcess;
