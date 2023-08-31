/* eslint-disable react/prop-types, react/no-unstable-nested-components */
import PropTypes from 'prop-types';
import {
  Button, DataTable, TextFilter, useToggle,
} from '@edx/paragon';
import { useState } from 'react';

import { adaptToTableFormat, getColumns } from '../../utils/helpers';
import { ValidationProcess } from '../ValidationProcess';
import { ModalLayout } from '../ModalLayout';
import { Timeline } from '../Timeline';

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

const ValidationTableView = ({ data }) => {
  const [isOpen, open, close] = useToggle(false);
  const [tabs, setTabs] = useState({});

  const getTabs = (courseSelected) => ([
    {
      name: 'validation_process',
      label: 'Validation process',
      component: <ValidationProcess courseSelected={courseSelected} />,
    },
    {
      name: 'past_processes',
      label: 'Past process(es)',
      component: (
        <Timeline
          passProcessEvents={courseSelected.validation_process_events}
          validationBody={courseSelected.validation_body}
        />
      ),
    },
  ]);

  const handleClickInCourseTitle = (courseID) => {
    const tabsWithComponents = getTabs(data.find((course) => course.course_id === courseID));
    setTabs(tabsWithComponents);
    open();
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
    <>
      <ModalLayout isOpen={isOpen} onClose={close} tabs={tabs} />

      <DataTable
        isFilterable
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
    </>

  );
};

ValidationTableView.propTypes = {
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

export default ValidationTableView;
