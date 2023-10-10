import PropTypes from 'prop-types';
import { Collapsible, Stack } from '@edx/paragon';

import { useIntl } from '@edx/frontend-platform/i18n';
import { FormLayout } from '../FormLayout';
import { addUtils } from '../../../utils/helpers';
import globalMessages from '../../../messages';
import messages from '../messages';

const submissionFieldUtilProps = (intl) => ([
  {
    name: 'courseName', label: intl.formatMessage(globalMessages.courseName), type: 'row', pos: 1,
  },
  {
    name: 'courseId', label: intl.formatMessage(globalMessages.courseId), type: 'col', pos: 2,
  },
  {
    name: 'organization', label: intl.formatMessage(globalMessages.organization), type: 'col', pos: 3,
  },
  {
    name: 'courseAuthor', label: intl.formatMessage(globalMessages.user), type: 'col', pos: 4,
  },
  {
    name: 'categories', label: intl.formatMessage(globalMessages.categories), type: 'col', pos: 5,
  },
  {
    name: 'submissionComments', label: intl.formatMessage(messages.submissionComments), type: 'row', pos: 6,
  },
  {
    name: 'submissionDate', label: intl.formatMessage(messages.submissionDate), type: 'col', pos: 7,
  },
  {
    name: 'validationBody', label: intl.formatMessage(globalMessages.validationBody), type: 'col', pos: 8,
  },
  {
    name: 'reviewer', label: intl.formatMessage(messages.reviewer), type: 'col', pos: 9,
  },
]);

const CourseSubmissionInfo = ({
  submissionInfo, isCollapsible, collapsibleProps,
}) => {
  const intl = useIntl();
  const submissionInfoWithDesignPropsWithUtilsProps = addUtils(submissionFieldUtilProps(intl), submissionInfo);
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
          {submissionInfoWithDesignPropsWithUtilsProps.map((field) => {
            const isValueAnArray = Array.isArray(field.value);
            const isValueADate = field.name.toLowerCase().includes('date')
              ? new Date(field.value).toLocaleDateString('en-GB')
              : field.value;
            const value = isValueAnArray ? field?.value?.join(', ') : isValueADate;
            return (
              <div key={`collapsible${field.name}${value}}`}>
                {field.label !== courseName.label && (
                  <p>
                    <span className="font-weight-bold">{field.label}: </span>
                    {value}
                  </p>
                )}
              </div>
            );
          })}
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
