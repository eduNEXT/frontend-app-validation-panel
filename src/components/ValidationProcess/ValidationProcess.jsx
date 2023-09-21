import PropTypes from 'prop-types';
import { useState } from 'react';
import { CheckCircle } from '@edx/paragon/icons';
import {
  Form, Icon, PageBanner, Stack,
} from '@edx/paragon';

import { useSelector } from 'react-redux';
import { ValidatorReview } from './ValidatorReview';
import { CourseSubmissionInfo } from './CourseSubmissionInfo';
import { getLastReviewEventInfo, getSubmissionInfo } from '../../utils/helpers';

const ValidationProcess = ({ courseSelected }) => {
  const [isReviewConfirmed, setIsReviewConfirmed] = useState(false);
  const [openCollapsible, setOpenCollapsible] = useState(null);

  const handleChangeReviewConfirmation = () => {
    setOpenCollapsible(false);
    setIsReviewConfirmed((prevState) => !prevState);
  };

  // TODO: Delete when backend sends the courseName through "/validation_process/<course_id>"
  const availableCourses = useSelector((state) => state.courses.availableUserCourses.data.results);
  const altCourseName = availableCourses.find((course) => course.courseId === courseSelected.courseId)?.name;
  const isValidator = useSelector((state) => state.userInfo.userInfo.isValidator);

  const submissionInfo = getSubmissionInfo(
    { ...courseSelected, courseName: courseSelected?.courseName ?? altCourseName },
  );
  const isCourseExempted = !!submissionInfo.isExempted;

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
      {(isValidator && !isCourseExempted) && (
      <Stack gap={3} className="my-4">
        <span>Before validating the course, review the content!</span>
        <Form.Checkbox onChange={handleChangeReviewConfirmation} checked={isReviewConfirmed}>
          Click here to confirm that you have reviewed the content in STUDIO.
        </Form.Checkbox>
      </Stack>
      )}
      {!isCourseExempted && (
      <ValidatorReview
        isReviewConfirmed={isReviewConfirmed}
        lastReviewEventInfo={getLastReviewEventInfo(courseSelected)}
      />
      )}
    </>
  );
};

ValidationProcess.propTypes = {
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

export default ValidationProcess;
