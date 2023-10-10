import PropTypes from 'prop-types';
import { FieldArray } from 'formik';
import { Close } from '@edx/paragon/icons';
import { Chip, Form, Stack } from '@edx/paragon';
import { useState } from 'react';

const CustomOption = ({
  className, onClick, value, optionId, label, children,
}) => (
  <Stack
    className={className}
    onClick={(e) => {
      e.currentTarget = { value };
      onClick(e);
    }}
  >
    <span>
      {children}
    </span>
    {label.toLowerCase().includes('course') && (
      <p className="text-gray x-small m-0">
        {optionId}
      </p>
    )}
  </Stack>
);

CustomOption.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string,
  optionId: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  label: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

CustomOption.defaultProps = {
  value: '',
  optionId: '',
  label: '',
};

const SelectField = ({
  label, description, name, as, options, handleChange, value, errorMessage, isArray, isLoading, disabled, setFieldValue,
}) => {
  const [selected, setSelected] = useState('');
  if (isArray) {
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
        <Form.Autosuggest
          placeholder="Select one"
          isLoading={isLoading}
          isInvalid={!!errorMessage}
          value={value ? selected : ''}
          onChange={(newValue) => {
            if (newValue === '') {
              setFieldValue(name, null); setSelected('');
            }
          }}
          onSelected={(newValue) => {
            const valueFound = options.find((el) => el.label === newValue);
            setSelected(valueFound.label);
            setFieldValue(name, valueFound.id);
          }}
        >
          {options?.map((optionInfo) => (
            <Form.AutosuggestOption
              key={optionInfo.id}
              as={CustomOption}
              optionId={optionInfo.id}
              label={label}
            >
              {optionInfo.label}
            </Form.AutosuggestOption>
          ))}
        </Form.Autosuggest>
        <Form.Control.Feedback hidden={!errorMessage} type="invalid">{errorMessage}</Form.Control.Feedback>
      </Stack>
    );
  }

  return (
    <Stack>
      <Form.Label className="w-100">
        <Stack direction="horizontal" className="w-100 justify-content-between">
          {label}
        </Stack>
      </Form.Label>
      <span className="small">{description}</span>
      <Form.Group isInvalid={!!errorMessage}>
        <Form.Control
          name={name}
          as={as}
          onChange={handleChange}
          value={value}
          disabled={disabled}
          size="sm"
        >
          <option hidden> Select one... </option>
          {options?.map((optionInfo) => (
            <option key={optionInfo.key} value={optionInfo.id}>{optionInfo.label}</option>
          ))}
        </Form.Control>
        <Form.Control.Feedback hidden={!errorMessage} type="invalid">{errorMessage}</Form.Control.Feedback>
      </Form.Group>
    </Stack>
  );
};

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  as: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string, label: PropTypes.string })),
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  errorMessage: PropTypes.string,
  isArray: PropTypes.bool,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  setFieldValue: PropTypes.func,
};

SelectField.defaultProps = {
  as: 'input',
  value: '',
  options: [],
  errorMessage: null,
  isArray: false,
  isLoading: false,
  disabled: false,
  setFieldValue: () => { },
};

export default SelectField;
