import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Button } from '@edx/paragon';
import { KeyboardArrowRight } from '@edx/paragon/icons';

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <Button
    style={{ zIndex: 1 }}
    className="w-100 d-flex justify-content-between box-shadow-centered-2"
    variant="tertiary"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <KeyboardArrowRight />
  </Button>
));

CustomToggle.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CustomToggle;
