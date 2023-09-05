import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CheckCircle } from '@edx/paragon/icons';
import {
  Form, Icon, PageBanner, Stack,
} from '@edx/paragon';

import { ValidatorReview } from './ValidatorReview';
import { CourseSubmissionInfo } from './CourseSubmissionInfo';
import { getLastReviewEventInfo, getSubmissionInfo } from '../../utils/helpers';

const ValidationProcess = () => {
  const courseSelected = useSelector((state) => state.currentValidationRecord);

  const [isReviewConfirmed, setIsReviewConfirmed] = useState(false);
  const [openCollapsible, setOpenCollapsible] = useState(null);

  const handleChangeReviewConfirmation = () => {
    setOpenCollapsible(false);
    setIsReviewConfirmed((prevState) => !prevState);
  };

  const isValidator = false;
  const submissionInfo = getSubmissionInfo(courseSelected);
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

export default ValidationProcess;
