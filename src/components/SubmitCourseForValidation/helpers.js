export const getDefaultValue = (options) => (options ? options[0].key : '');

export const getInitialValues = (fieldData) => {
  const initialValues = {};
  fieldData.forEach((field) => {
    initialValues[field.name] = getDefaultValue(field?.options);
  });

  return initialValues;
};
