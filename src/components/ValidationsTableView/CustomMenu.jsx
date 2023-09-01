import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const CustomMenu = forwardRef(
  ({ children, style }, ref) => (
    <div
      ref={ref}
      style={{ ...style, zIndex: 2 }}
      className="mt-1 bg-white border rounded px-3 pb-2 pt-3"
    >
      {children}
    </div>
  ),
);

CustomMenu.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  style: PropTypes.shape.isRequired,
};

export default CustomMenu;
