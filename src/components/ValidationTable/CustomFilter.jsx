import PropTypes from 'prop-types';
import { Dropdown, Scrollable } from '@edx/paragon';

import CustomToggle from './CustomToggleButton';

const CustomFilter = ({
  _ref, Filter, children,
}) => (
  <Dropdown drop="right">
    <Dropdown.Toggle as={CustomToggle} variant="tertiary">
      {_ref.column.Header}
    </Dropdown.Toggle>
    <Dropdown.Menu className="p-3 border rounded top-0">
      {children}
      <Scrollable style={{ height: '20vh', maxHeight: '20vh' }} className="mt-2">
        {Filter(_ref)}
      </Scrollable>
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
