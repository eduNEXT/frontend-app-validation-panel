import { DataTable, TextFilter } from '@edx/paragon';
import React from 'react';
import PropTypes from 'prop-types';
import { adaptToTableFormat, getColumns } from '../utils/helpers';

const ValidationsTableView = ({ data }) => (
  <DataTable
    isFilterable
    isSortable
    defaultColumnValues={{ Filter: TextFilter }}
    itemCount={data.length}
    data={adaptToTableFormat(data)}
    columns={getColumns(data)}
    // TODO: Add actions according to the validation status
    // additionalColumns={[
    //   {
    //     id: 'action',
    //     Header: 'Action',
    //     // Proptypes disabled as this prop is passed in separately
    //     Cell: ({ row }) => <Button variant="link" onClick={() => console.log("Assign", row)}>Assign</Button>,
    //   }
    // ]}
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
