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

const ActionButton = ({ label, action, row }) => (
  <Button variant="link" onClick={() => action(row)}>
    {label}
  </Button>
);

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  row: PropTypes.shape.isRequired,
};

const ValidationsTableView = ({ data }) => (
  <DataTable
    isFilterable
    isSortable
    defaultColumnValues={{ Filter: TextFilter }}
    itemCount={data.length}
    data={adaptToTableFormat(data)}
    columns={getColumns(data)}
    additionalColumns={isCourseAuthor ? [
      {
        id: 'action',
        Header: 'Action',
        // eslint-disable-next-line react/no-unstable-nested-components, react/prop-types
        Cell: ({ row }) => {
          // eslint-disable-next-line react/prop-types
          const label = ActionsAvailable[row.values.status?.toLowerCase()]?.label || '';
          // eslint-disable-next-line react/prop-types
          const action = ActionsAvailable[row.values.status?.toLowerCase()]?.action || '';

          return label ? <ActionButton label={label} action={action} row={row} /> : null;
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

ValidationsTableView.propTypes = {
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

export default ValidationsTableView;
