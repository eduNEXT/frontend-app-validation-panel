import PropTypes from 'prop-types';
import { Form, Stack } from '@edx/paragon';

const FormInput = ({
  handleChange, name, value, disabled, label, labelAssistant, errorMessage,
}) => (
  <Form.Group>
    <Form.Label className="w-100">
      <Stack direction="horizontal" className="w-100 justify-content-between">
        {label}
        {labelAssistant}
      </Stack>
    </Form.Label>
    <Form.Control
      as={label.toLowerCase().includes('comment') ? 'textarea' : 'input'}
      isInvalid={!!errorMessage}
      autoResize
      size="sm"
      name={name}
      onChange={handleChange}
      value={Array.isArray(value) ? value.join(', ') : value}
      disabled={disabled}
    />
    <Form.Control.Feedback hidden={!errorMessage} type="invalid">{errorMessage}</Form.Control.Feedback>
  </Form.Group>
);

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelAssistant: PropTypes.node,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType(PropTypes.string, PropTypes.arrayOf(PropTypes.string)),
  errorMessage: PropTypes.string,
};

FormInput.defaultProps = {
  labelAssistant: null,
  disabled: false,
  value: '',
  errorMessage: '',
};

export default FormInput;
