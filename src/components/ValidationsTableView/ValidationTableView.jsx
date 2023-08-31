/* eslint-disable react/prop-types, react/no-unstable-nested-components */
import PropTypes from 'prop-types';
import { Button, DataTable, TextFilter } from '@edx/paragon';
import { adaptToTableFormat, getColumns } from '../../utils/helpers';

// TODO: Modify this to execute the proper needed action
const ActionsAvailable = {
  submitted: {
    action: (row) => console.log('submitted', row),
    label: 'Cancel validation',
  },
  draft: {
    action: (row) => console.log('draft', row),
    label: 'Re-submit for validation',
  },
  approved: {
    action: (row) => console.log('approved', row),
    label: 'Cancel validation',
  },
};

// TODO: Change this by the @edx/frontend-platform getAuthenticatedUser.roles
const isCourseAuthor = true;

const ActionButton = ({ label, action }) => (
  <Button variant="link" onClick={action} style={{ fontSize: '0.9rem' }}>
    {label}
  </Button>
);

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

const validationTableView = ({ data }) => {
  const handleClickInCourseTitle = (aux) => {
    console.log(aux);
  };

  const columnsWithClickableNames = getColumns(data).map((col) => {
    if (col.accessor === 'course_name') {
      return {
        ...col,
        Cell: ({ row }) => (
          <ActionButton
            label={row.values.course_name}
            action={() => handleClickInCourseTitle(row.values.course_id)}
          />
        ),
      };
    }

    return col;
  });

  return (
    <DataTable
      isFilterable
      isSortable
      defaultColumnValues={{ Filter: TextFilter }}
      itemCount={data.length}
      data={adaptToTableFormat(data)}
      columns={columnsWithClickableNames}
      additionalColumns={isCourseAuthor ? [
        {
          id: 'action',
          Header: 'Action',
          Cell: ({ row }) => {
            const label = ActionsAvailable[row.values.status?.toLowerCase()]?.label || '';
            const action = ActionsAvailable[row.values.status?.toLowerCase()]?.action || '';
            return label ? <ActionButton label={label} action={() => action(row)} /> : null;
          },
        },
      ] : false}
    >
      <DataTable.TableControlBar />
      <DataTable.Table />
      <DataTable.EmptyTable content="No results found" />
      <DataTable.TableFooter />
    </DataTable>
  );
};

validationTableView.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      courseName: PropTypes.string,
      courseId: PropTypes.string,
      organization: PropTypes.number,
      validationBody: PropTypes.number,
      status: PropTypes.string,
    }),
  ).isRequired,
};

export default validationTableView;
