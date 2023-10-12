/* eslint-disable react/prop-types, react/no-unstable-nested-components */
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Button, CheckboxFilter, DataTable, TextFilter, useToggle, Stack, Form,
} from '@edx/paragon';

import {
  ActionsAvailable, adaptToTableFormat, createCustomFilterChoices, getColumns, statusFilterOptions,
} from './helpers';

import CustomFilter from './CustomFilter';
import { ModalLayout } from '../ModalLayout';
import { ValidationProcess } from '../ValidationProcess';
import { Timeline as PastProcesses } from '../Timeline';
import { getCurrentValidationProcessByCourseId } from '../../data/slices';
import { REQUEST_STATUS, VALIDATION_ACCESS_ROLE, VALIDATION_STATUS_LABEL } from '../../data/constants';
import messages from './messages';

const ValidationTable = ({ data, isLoading }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const isValidator = useSelector((state) => state.userInfo.userInfo.isValidator);
  const availableReasons = useSelector((state) => state.rejectionReasons.data);
  const courseIdsCurrentUserIsReviewing = useSelector(
    (state) => state.validationRecord.availableValidationProcesses.courseIdsCurrentUserIsReviewing,
  );
  const dataFiltersChoices = {
    categories: useSelector((state) => (state.courseCategories.availableCourseCategories.data)),
    organization: useSelector((state) => state.organizations.availableOrganizations.data),
    validationBody: useSelector((state) => state.validationBody.availableValidationBodies.data),
    status: statusFilterOptions,
  };

  const [isOpen, open, close] = useToggle(false);

  const [columnsWithClickableNames, setColumnsWithClickableNames] = useState([]);
  const [auxColumnsWithClickableNames, setAuxColumnsWithClickableNames] = useState([]);

  const keywordInitialState = {
    value: {
      organization: '',
      categories: '',
      validationBody: '',
    },
    colAccessor: '',
  };
  const [keyword, setKeyword] = useState(keywordInitialState);

  const handleClickInCourseTitle = (courseId) => {
    dispatch(getCurrentValidationProcessByCourseId(courseId));
    open();
  };

  const handleFilterChoices = (value, accessor) => {
    const newValues = auxColumnsWithClickableNames.map((column) => {
      if (column?.accessor === accessor) {
        const newOptions = column.filterChoices.filter((option) => (
          option.name.toLowerCase().includes(value[accessor].toLowerCase())
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

  const getColumnsWithClickableNames = (dataToAdapt) => getColumns(dataToAdapt, intl).map((col) => {
    const needSearchBar = col?.accessor === 'organization' || col?.accessor === 'categories' || col?.accessor === 'validationBody';

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
            <Form.Control
              onChange={debounce((e) => setKeyword(
                (prevState) => (
                  { value: { ...prevState.value, [col.accessor]: e.target.value }, colAccessor: col.accessor }
                ),
              ), 500)}
              placeholder={intl.formatMessage(messages.typeaheadFilterPlaceholder, { filterField: _ref.column.Header })}
            />
          </CustomFilter>
        );

        const commonProperties = {
          Filter: (_ref) => addFilterWithSearchBar(_ref),
          filterChoices: createCustomFilterChoices(dataFiltersChoices[col.accessor]),
        };

        if (col?.accessor === 'categories') {
          return {
            ...col,
            ...commonProperties,
            Cell: ({ row }) => row.values.categories.join(', '),
          };
        }
        return {
          ...col,
          ...commonProperties,
        };
      }

      return {
        ...col,
        Filter: (_ref) => (
          <CustomFilter _ref={_ref} Filter={CheckboxFilter} />
        ),
        filterChoices: dataFiltersChoices[col.accessor],
      };
    }

    return col;
  });

  useEffect(() => {
    handleFilterChoices(keyword.value, keyword.colAccessor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword.value.categories, keyword.value.organization, keyword.value.validationBody]);

  useEffect(() => {
    setColumnsWithClickableNames(getColumnsWithClickableNames(data));

    // This AUX is created for handling the filters
    setAuxColumnsWithClickableNames(getColumnsWithClickableNames(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.length, courseIdsCurrentUserIsReviewing.length]);

  const currentValidationRecord = useSelector((state) => state.currentValidationRecord);
  const sortedCurrentValidationRecordEvents = [...currentValidationRecord?.validationProcessEvents || []].sort(
    (a, b) => {
      if (a.id > b.id) { return -1; }
      if (a.id < b.id) { return 1; }
      return 0;
    },
  );

  return (
    <>
      <ModalLayout
        isLoading={currentValidationRecord.loadStatus === REQUEST_STATUS.LOADING}
        isOpen={isOpen}
        onClose={close}
        tabs={[
          {
            name: 'validation_process',
            label: intl.formatMessage(messages.validationProcesDescription),
            component: <ValidationProcess onClose={close} courseSelected={currentValidationRecord} />,
          },
          {
            name: 'past_processes',
            label: intl.formatMessage(messages.validationProcessPastEvents),
            component: <PastProcesses
              pastProcessEvents={sortedCurrentValidationRecordEvents}
              validationBody={currentValidationRecord?.validationBody}
              availableReasons={availableReasons}
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
            Header: intl.formatMessage(messages.actionColumn),
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

const EmptyTableMessage = () => {
  const intl = useIntl();

  return (
    <Stack className="align-items-center my-6">
      <span className="h2 text-uppercase">
        {intl.formatMessage(messages.notResults)}
      </span>
    </Stack>
  );
};

const ActionButton = ({ label, action }) => (
  <Button variant="link" onClick={action} style={{ fontSize: '0.9rem', textAlign: 'left' }}>
    {label}
  </Button>
);

ActionButton.propTypes = {
  label: PropTypes.node.isRequired,
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
