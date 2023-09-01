import {
  Form, Icon, PageBanner, Stack,
} from '@edx/paragon';
import { CheckCircle } from '@edx/paragon/icons';
import { useState } from 'react';
import { getLastReviewEventInfo, getSubmissionInfo } from '../../utils/helpers';
import { CourseSubmissionInfo } from './CourseSubmissionInfo';
import { ValidatorReview } from './ValidatorReview';

// TODO: How will be received the current reviewer?
const courseSelected = {
  course_name: 'Test Course #1',
  course_id: 'course-v1:org1+test-course-1',
  organization: 'Organization 1',
  categories: ['Category 1', 'Category 2'],
  validation_body: 'Validator Body #1',
  validation_process_events: [
    {
      status: 'Exempt',
      created_at: '2023-08-01',
      reason: null,
      comment: 'This is the comment of the course author. This is the comment of the course author. This is the comment of the course author',
      user: 'Course Author 1',
    },
    {
      status: 'Disapproved',
      created_at: '2023-08-15',
      reason: 'Reason 1',
      comment: 'This is the comment of Validator 1 This is the comment of Validator 1 This is the comment of Validator 1 This is the comment of Validator 1',
      user: 'Validator 1',
    },
  ],
};

const ValidationProcess = () => {
  const [didValidatorConfirmReview, setDidValidatorConfirmReview] = useState(false);
  const [openCollapsible, setOpenCollapsible] = useState(null);

  const handleChangeReviewConfirmation = () => {
    setOpenCollapsible(false);
    setDidValidatorConfirmReview((prevState) => !prevState);
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
          open: openCollapsible || !didValidatorConfirmReview,
          onToggle: () => setOpenCollapsible((prevState) => !prevState),
        }}
        submissionInfo={submissionInfo}
      />
      {(isValidator && !isCourseExempted) && (
      <Stack gap={3} className="my-4">
        <span>Before validating the course, review the content!</span>
        <Form.Checkbox onChange={handleChangeReviewConfirmation} checked={didValidatorConfirmReview}>
          Click here to confirm that you have reviewed the content in STUDIO.
        </Form.Checkbox>
      </Stack>
      )}
      {!isCourseExempted && (
      <ValidatorReview
        didValidatorConfirmReview={didValidatorConfirmReview}
        lastReviewEventInfo={getLastReviewEventInfo(courseSelected)}
      />
      )}
    </>
  );
};

export default ValidationProcess;
