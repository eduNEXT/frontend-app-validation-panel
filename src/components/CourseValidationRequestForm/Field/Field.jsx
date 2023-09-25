import PropTypes from 'prop-types';
import { FieldArray } from 'formik';
import { Close } from '@edx/paragon/icons';
import { Chip, Form, Stack } from '@edx/paragon';

const Field = ({
  label, description, name, as, options, handleChange, value, errorMessage,
}) => {
  if (as === 'multipleSelector') {
    return (
      <FieldArray
        name={name}
        render={({ push, remove }) => (
          <Stack>
            <span>{label}</span>
            <span className="small">{description}</span>
            <Form.Autosuggest
              placeholder="Select at least one..."
              isInvalid={!!errorMessage}
              onSelected={(newValue) => {
                const valueFoundIndex = value.findIndex((el) => el === newValue);
                if (valueFoundIndex !== -1) {
                  remove(valueFoundIndex);
                } else {
                  push(newValue);
                }
              }}
            >
              {options?.map((optionInfo) => (
                <Form.AutosuggestOption
                  key={optionInfo.key}
                  value={optionInfo.id}
                >
                  {optionInfo.label}
                </Form.AutosuggestOption>
              ))}
            </Form.Autosuggest>
            <Form.Control.Feedback hidden={!errorMessage} type="invalid">{errorMessage}</Form.Control.Feedback>

            <Stack direction="horizontal" gap={3}>
              {value.map((category, idx) => (
                <Chip
                  iconAfter={Close}
                  onIconAfterClick={() => {
                    remove(idx);
                  }}
                >
                  {category}
                </Chip>
              ))}
            </Stack>
          </Stack>
        )}
      />
    );
  }

  if (as === 'autosuggest') {
    return (
      <Stack>
        <span>{label}</span>
        <span className="small">{description}</span>
        <Form.Group isInvalid={!!errorMessage}>
          <Form.Autosuggest name={name} as="input" onSelected={handleChange} value={value}>
            {options?.map((optionInfo) => (
              <Form.AutosuggestOption
                key={optionInfo.key}
              >
                {optionInfo.label}
              </Form.AutosuggestOption>
            ))}
          </Form.Autosuggest>
          <Form.Control.Feedback hidden={!errorMessage} type="invalid">{errorMessage}</Form.Control.Feedback>
        </Form.Group>
      </Stack>
    );
  }

  return (
    <Stack>
      <span>{label}</span>
      <span className="small">{description}</span>
      <Form.Group isInvalid={!!errorMessage}>
        <Form.Control name={name} as={as} onChange={handleChange} value={value}>
          <option hidden selected> Select one... </option>
          {options?.map((optionInfo) => (
            <option key={optionInfo.key} value={optionInfo.id}>{optionInfo.label}</option>
          ))}
        </Form.Control>
        <Form.Control.Feedback hidden={!errorMessage} type="invalid">{errorMessage}</Form.Control.Feedback>
      </Form.Group>
    </Stack>
  );
};

Field.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  as: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string, label: PropTypes.string })),
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  errorMessage: PropTypes.string,
};

Field.defaultProps = {
  as: 'input',
  value: '',
  options: [],
  errorMessage: null,
};

export default Field;
