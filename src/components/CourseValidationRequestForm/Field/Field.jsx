import { Form, Stack } from '@edx/paragon';
import PropTypes from 'prop-types';

const Field = ({
  label, description, name, as, options, handleChange, value,
}) => (
  <Stack>
    <span>{label}</span>
    <span className="small">{description}</span>
    <Form.Group>
      <Form.Control name={name} as={as} onChange={handleChange} value={value}>
        <option hidden selected> Select one... </option>
        { options?.map((optionInfo) => (
          <option key={optionInfo.key} value={optionInfo.id}>{optionInfo.label}</option>
        ))}
      </Form.Control>
    </Form.Group>
  </Stack>
);

Field.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  as: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string, label: PropTypes.string })),
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

Field.defaultProps = {
  as: 'input',
  value: '',
  options: [],
};

export default Field;
