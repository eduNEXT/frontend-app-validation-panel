import PropTypes from 'prop-types';
import { Form, Hyperlink, Stack } from '@edx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { useState } from 'react';
import { getLastReviewEventInfo, getSubmissionInfo } from '../../utils/helpers';
import { CourseSubmissionInfo } from './CourseSubmissionInfo';
import { ValidatorReview } from './ValidatorReview';

const ValidationProcess = ({ courseSelected }) => {
  const [didValidatorConfirmReview, setDidValidatorConfirmReview] = useState(false);
  const [openCollapsible, setOpenCollapsible] = useState(null);

  const isValidator = localStorage.getItem('isValidator') === 'true';

  const handleChangeReviewConfirmation = () => {
    setOpenCollapsible(false);
    setDidValidatorConfirmReview((prevState) => !prevState);
  };

  const courseStudioURL = `${getConfig().STUDIO_URL}/course/${courseSelected.course_id}`;

  return (
    <>
      <CourseSubmissionInfo
        isCollapsible={isValidator}
        collapsibleProps={{
          open: openCollapsible || !didValidatorConfirmReview,
          onToggle: () => setOpenCollapsible((prevState) => !prevState),
        }}
        submissionInfo={getSubmissionInfo(courseSelected)}
      />
      {isValidator && (
      <Stack gap={3} className="my-4">
        <span>
          Before validating the course, review the content!{' '}
          <Hyperlink destination={courseStudioURL} className="text-dark" style={{ textDecoration: 'underline' }}>
            <strong>View course in Studio</strong>
          </Hyperlink>
        </span>
        <Form.Checkbox onChange={handleChangeReviewConfirmation} checked={didValidatorConfirmReview}>
          Please confirm if you have reviewed the content in STUDIO.
        </Form.Checkbox>
      </Stack>
      )}
      <ValidatorReview
        didValidatorConfirmReview={didValidatorConfirmReview}
        lastReviewEventInfo={getLastReviewEventInfo(courseSelected)}
      />
    </>
  );
};

ValidationProcess.propTypes = {
  courseSelected: PropTypes.shape({
    course_name: PropTypes.string,
    course_id: PropTypes.string,
    organization: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    validation_body: PropTypes.string,
    validation_process_events: PropTypes.arrayOf(
      PropTypes.shape({
        status: PropTypes.string,
        created_at: PropTypes.string,
        reason: PropTypes.string,
        comment: PropTypes.string,
        user: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default ValidationProcess;
