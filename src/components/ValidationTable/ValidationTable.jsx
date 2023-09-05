/* eslint-disable react/prop-types, react/no-unstable-nested-components */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  Button, CheckboxFilter, DataTable, TextFilter, SearchField,
} from '@edx/paragon';
import { Search } from '@edx/paragon/icons';

import { adaptToTableFormat, getColumns } from '../../utils/helpers';
import CustomFilter from './CustomFilter';

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

const ActionButton = ({ label, action }) => (
  <Button variant="link" onClick={action} style={{ fontSize: '0.9rem' }}>
    {label}
  </Button>
);

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

const ValidationTable = ({ data, isLoading }) => {
  const isValidator = false;

  const [columnsWithClickableNames, setColumnsWithClickableNames] = useState([]);
  const [auxColumnsWithClickableNames, setAuxColumnsWithClickableNames] = useState([]);

  const [keyword, setKeyword] = useState({
    value: '',
    col: null,
  });

  const handleClickInCourseTitle = (aux) => {
    console.log(aux);
  };

  const handleFilterChoices = (value, col) => {
    const newValues = auxColumnsWithClickableNames.map((column) => {
      if (column?.accessor === col?.accessor) {
        const newOptions = column.filterChoices.filter((option) => (
          option.name.toLowerCase().includes(value.toLowerCase())
        ));

        return {
          ...column,
          filterChoices: newOptions,
        };
      }

      return column;
    });

    setColumnsWithClickableNames(newValues);
  };

  const getColumnsWithClickableNames = (dataToAdapt) => getColumns(dataToAdapt).map((col) => {
    if (col?.accessor === 'course_name') {
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

    if (!col.disableFilters) {
      if (col?.accessor === 'organization' || col?.accessor === 'categories') {
        return {
          ...col,
          Filter: (_ref) => (
            <CustomFilter _ref={_ref} Filter={CheckboxFilter}>
              <SearchField.Advanced
                submitButtonLocation="external"
                onSubmit={(value) => setKeyword({ value, col })}
              >
                <div className="pgn__searchfield_wrapper">
                  <SearchField.Input placeholder={`Find ${_ref.column.Header}`} />
                </div>
                <SearchField.SubmitButton buttonText={<Search />} submitButtonLocation="external" />
              </SearchField.Advanced>
            </CustomFilter>
          ),
        };
      }
      return {
        ...col,
        Filter: (_ref) => (
          <CustomFilter _ref={_ref} Filter={CheckboxFilter} />
        ),
      };
    }

    return col;
  });

  useEffect(() => {
    handleFilterChoices(keyword.value, keyword.col);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword.value]);

  useEffect(() => {
    const auxData = getColumnsWithClickableNames(data);
    setColumnsWithClickableNames(auxData);
    setAuxColumnsWithClickableNames(auxData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.length]);

  return (
    <DataTable
      isLoading={isLoading}
      isFilterable
      defaultColumnValues={{ Filter: TextFilter }}
      itemCount={data?.length}
      data={adaptToTableFormat(data)}
      columns={columnsWithClickableNames}
      additionalColumns={!isValidator ? [
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

ValidationTable.propTypes = {
  isLoading: PropTypes.bool,
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

ValidationTable.defaultProps = {
  isLoading: true,
};

export default ValidationTable;
