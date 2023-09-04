import PropTypes from 'prop-types';
import { Form, Stack } from '@edx/paragon';

const FormInput = ({
  handleChange, name, value, disabled, type, label, labelAssistant,
}) => (
  <Form.Group style={{ width: type === 'col' ? '48%' : '100%' }}>
    <Form.Label className="w-100">
      <Stack direction="horizontal" className="w-100 justify-content-between">
        {label}
        {labelAssistant}
      </Stack>
    </Form.Label>
    <Form.Control
      as={label.toLowerCase().includes('comment') ? 'textarea' : 'input'}
      autoResize
      size="sm"
      name={name}
      onChange={handleChange}
      value={Array.isArray(value) ? value.join(', ') : value}
      disabled={disabled}
    />
  </Form.Group>
);

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  labelAssistant: PropTypes.node,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType(PropTypes.string, PropTypes.arrayOf(PropTypes.string)),
};

FormInput.defaultProps = {
  labelAssistant: null,
  disabled: false,
  value: '',
};

export default FormInput;
