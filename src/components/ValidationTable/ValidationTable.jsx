/* eslint-disable react/prop-types, react/no-unstable-nested-components */
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Search } from '@edx/paragon/icons';
import {
  Button, CheckboxFilter, DataTable, TextFilter, SearchField, useToggle, Stack,
} from '@edx/paragon';

import { ActionsAvailable } from './helpers';
import { adaptToTableFormat, getColumns } from '../../utils/helpers';

import CustomFilter from './CustomFilter';
import { ModalLayout } from '../ModalLayout';
import { ValidationProcess } from '../ValidationProcess';
import { Timeline as PastProcesses } from '../Timeline';
import { getCurrentValidationProcessByCourseId } from '../../data/slices';
import { REQUEST_STATUS, VALIDATION_ACCESS_ROLE, VALIDATION_STATUS_LABEL } from '../../data/constants';

const ValidationTable = ({ data, isLoading }) => {
  const dispatch = useDispatch();
  const isValidator = useSelector((state) => state.userInfo.userInfo.isValidator);
  const availableReasons = useSelector((state) => state.rejectionReasons.data);
  const courseIdsCurrentUserIsReviewing = useSelector(
    (state) => state.validationRecord.availableValidationProcesses.courseIdsCurrentUserIsReviewing,
  );

  const [isOpen, open, close] = useToggle(false);

  const [columnsWithClickableNames, setColumnsWithClickableNames] = useState([]);
  const [auxColumnsWithClickableNames, setAuxColumnsWithClickableNames] = useState([]);

  const [keyword, setKeyword] = useState({
    value: '',
    col: null,
  });

  const handleClickInCourseTitle = (courseId) => {
    dispatch(getCurrentValidationProcessByCourseId(courseId));
    open();
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
    const needSearchBar = col?.accessor === 'organization' || col?.accessor === 'categories';

    if (col?.accessor === 'courseName') {
      return {
        ...col,
        Cell: ({ row }) => {
          const isInReview = row.values.status === VALIDATION_STATUS_LABEL.revi;
          const isReviewedByCurrentUser = courseIdsCurrentUserIsReviewing.includes(row.values.courseId);
          const canGiveFeedback = isInReview && isReviewedByCurrentUser;

          if (isValidator && !canGiveFeedback) {
            return row.values.courseName;
          }

          return (
            <ActionButton
              label={row.values.courseName}
              action={() => handleClickInCourseTitle(row.values.courseId)}
            />
          );
        },
      };
    }

    if (!col.disableFilters) {
      if (needSearchBar) {
        const addFilterWithSearchBar = (_ref) => (
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
        );

        if (col?.accessor === 'categories') {
          return {
            ...col,
            Cell: ({ row }) => row.values.categories.join(', '),
            Filter: (_ref) => addFilterWithSearchBar(_ref),
          };
        }

        return {
          ...col,
          Filter: (_ref) => addFilterWithSearchBar(_ref),
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
    setColumnsWithClickableNames(getColumnsWithClickableNames(data));

    // This AUX is created for handling the filters
    setAuxColumnsWithClickableNames(getColumnsWithClickableNames(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.length, courseIdsCurrentUserIsReviewing.length]);

  const currentValidationRecord = useSelector((state) => state.currentValidationRecord);

  return (
    <>
      <ModalLayout
        isLoading={currentValidationRecord.loadStatus === REQUEST_STATUS.LOADING}
        isOpen={isOpen}
        onClose={close}
        tabs={[
          {
            name: 'validation_process',
            label: 'Validation process',
            component: <ValidationProcess onClose={close} courseSelected={currentValidationRecord} />,
          },
          {
            name: 'past_processes',
            label: 'Past process(es)',
            component: <PastProcesses
              pastProcessEvents={currentValidationRecord.validationProcessEvents}
              validationBody={currentValidationRecord?.validationBody}
            />,
          },
        ]}
      />

      <DataTable
        isLoading={isLoading}
        isFilterable
        defaultColumnValues={{ Filter: TextFilter }}
        itemCount={data?.length}
        data={adaptToTableFormat(data, availableReasons)}
        columns={columnsWithClickableNames}
        additionalColumns={data.length ? [
          {
            Cell: ({ row }) => {
              const userPermission = isValidator ? VALIDATION_ACCESS_ROLE.VALIDATOR : VALIDATION_ACCESS_ROLE.AUTHOR;
              const isInReview = row.values.status === VALIDATION_STATUS_LABEL.revi;
              const isReviewedByCurrentUser = courseIdsCurrentUserIsReviewing.includes(row.values.courseId);

              const label = ActionsAvailable[row.values.status?.toLowerCase()]?.[userPermission]?.label;
              const action = ActionsAvailable[row.values.status?.toLowerCase()]?.[userPermission]?.action;
              return (!!label && !!action && (!isInReview || isReviewedByCurrentUser))
                ? <ActionButton label={label} action={() => action(row, dispatch)} />
                : null;
            },
          },
        ] : []}
      >
        <DataTable.TableControlBar />
        <DataTable.Table />
        <DataTable.EmptyTable content={<EmptyTableMessage />} />
        <DataTable.TableFooter />
      </DataTable>
    </>
  );
};

const EmptyTableMessage = () => (
  <Stack className="align-items-center my-6">
    <span className="h2 text-uppercase">
      Not available validation processes
    </span>
  </Stack>
);

const ActionButton = ({ label, action }) => (
  <Button variant="link" onClick={action} style={{ fontSize: '0.9rem', textAlign: 'left' }}>
    {label}
  </Button>
);

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

ValidationTable.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      courseName: PropTypes.string,
      courseId: PropTypes.string,
      organization: PropTypes.string,
      validationBody: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
};

ValidationTable.defaultProps = {
  isLoading: false,
};

export default ValidationTable;
