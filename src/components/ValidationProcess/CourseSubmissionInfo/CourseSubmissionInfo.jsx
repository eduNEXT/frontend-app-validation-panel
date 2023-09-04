import PropTypes from 'prop-types';
import { Collapsible, Stack } from '@edx/paragon';

import { FormLayout } from '../FormLayout';
import { addUtils } from '../../../utils/helpers';

const submissionFieldUtilProps = [
  {
    name: 'courseName', label: 'Course Name', type: 'row', pos: 1,
  },
  {
    name: 'courseId', label: 'Course ID', type: 'col', pos: 2,
  },
  {
    name: 'organization', label: 'Organization', type: 'col', pos: 3,
  },
  {
    name: 'courseAuthor', label: 'Course Author', type: 'col', pos: 4,
  },
  {
    name: 'categories', label: 'Categories', type: 'col', pos: 5,
  },
  {
    name: 'submissionComments', label: 'Submission Comments', type: 'row', pos: 6,
  },
  {
    name: 'submissionDate', label: 'Submission Date', type: 'col', pos: 7,
  },
  {
    name: 'validationBody', label: 'Validation Body', type: 'col', pos: 8,
  },
  {
    name: 'reviewer', label: 'Reviewer', type: 'col', pos: 9,
  },
];

const CourseSubmissionInfo = ({
  submissionInfo, isCollapsible, collapsibleProps,
}) => {
  const submissionInfoWithDesignPropsWithUtilsProps = addUtils(submissionFieldUtilProps, submissionInfo);
  const courseName = submissionInfoWithDesignPropsWithUtilsProps.find((field) => field.label.toLowerCase().includes('name'));

  if (isCollapsible) {
    return (
      <Collapsible
        className="bg-light-300"
        open={collapsibleProps.open}
        onToggle={collapsibleProps.onToggle}
        styling="card-lg"
        title={(
          <strong>
            {courseName.label}: {courseName.value}
          </strong>
        )}
      >
        <Stack gap={2}>
          {submissionInfoWithDesignPropsWithUtilsProps.map((field) => (
            <div>
              {field.label !== courseName.label && (
              <p>
                <span className="font-weight-bold">{field.label}: </span>
                {typeof field.value === 'string' ? field.value : field.value.join(', ')}
              </p>
              )}
            </div>
          ))}
        </Stack>
      </Collapsible>
    );
  }

  return (
    <FormLayout
      useSpecialDateUsage
      data={submissionInfoWithDesignPropsWithUtilsProps}
      isExempted={submissionInfo.isExempted}
    />
  );
};

CourseSubmissionInfo.propTypes = {
  submissionInfo: PropTypes.shape({
    courseName: PropTypes.string,
    courseId: PropTypes.string,
    organization: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    validationBody: PropTypes.string,
    currentValidator: PropTypes.string,
    courseAuthor: PropTypes.string,
    submissionDate: PropTypes.string,
    isExempted: PropTypes.bool,
  }).isRequired,
  isCollapsible: PropTypes.bool,
  collapsibleProps: PropTypes.shape({
    open: PropTypes.bool,
    onToggle: PropTypes.func,
  }),
};

CourseSubmissionInfo.defaultProps = {
  isCollapsible: false,
  collapsibleProps: {
    open: false,
    onToggle: null,
  },
};

export default CourseSubmissionInfo;
