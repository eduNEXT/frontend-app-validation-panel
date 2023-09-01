import PropTypes from 'prop-types';
import { Dropdown, Stack } from '@edx/paragon';

import CustomMenu from './CustomMenu';
import CustomToggle from './CustomToggleButton';

const CustomFilter = ({
  _ref, Filter, children,
}) => (
  <Dropdown>
    <Dropdown.Toggle as={CustomToggle} variant="tertiary">
      {_ref.column.Header}
    </Dropdown.Toggle>
    <Dropdown.Menu as={CustomMenu} style={{ minWidth: children ? '350px' : '' }}>
      <Stack gap={3}>
        {children}
        <div className="mx-3">
          {Filter(_ref)}
        </div>
      </Stack>
    </Dropdown.Menu>
  </Dropdown>
);

CustomFilter.propTypes = {
  _ref: PropTypes.shape({
    column: PropTypes.shape({
      Header: PropTypes.string.isRequired,
    }),
  }).isRequired,
  Filter: PropTypes.func.isRequired,
  children: PropTypes.oneOf([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

CustomFilter.defaultProps = {
  children: false,
};

export default CustomFilter;
