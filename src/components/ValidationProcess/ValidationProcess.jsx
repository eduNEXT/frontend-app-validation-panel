import PropTypes from 'prop-types';
import { useState } from 'react';

import { getConfig } from '@edx/frontend-platform';
import { useSelector } from 'react-redux';
import { CheckCircle } from '@edx/paragon/icons';
import {
  Form, Icon, PageBanner, Stack,
} from '@edx/paragon';
import { ValidatorReview } from './ValidatorReview';
import { CourseSubmissionInfo } from './CourseSubmissionInfo';
import { getLastReviewEventInfo, getSubmissionInfo } from '../../utils/helpers';
import { isPendingCourse } from './helpers';

const ValidationProcess = ({ courseSelected, onClose }) => {
  const [isReviewConfirmed, setIsReviewConfirmed] = useState(false);
  const [openCollapsible, setOpenCollapsible] = useState(false);

  const handleChangeReviewConfirmation = () => {
    setOpenCollapsible(false);
    setIsReviewConfirmed((prevState) => !prevState);
  };

  const isValidator = useSelector((state) => state.userInfo.userInfo.isValidator);

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
              This course is automatically approved without undergoing
              a validation process, as it belongs to an exempt organization.
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
            <span>Before validating the course, review the content! </span>
            <a
              href={`${getConfig().STUDIO_BASE_URL}/course/${courseSelected.courseId}`}
              target="_blank"
              rel="noreferrer"
              className="text-gray-900 muted-link"
            >View course in Studio
            </a>
          </p>
          <Form.Checkbox onChange={handleChangeReviewConfirmation} checked={isReviewConfirmed}>
            Click here to confirm that you have reviewed the content in STUDIO.
          </Form.Checkbox>
        </Stack>
      )}
      {!isCourseExempted && (
        <ValidatorReview
          onClose={onClose}
          courseId={courseSelected.courseId}
          isReviewConfirmed={isReviewConfirmed}
          lastReviewEventInfo={getLastReviewEventInfo(courseSelected)}
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
