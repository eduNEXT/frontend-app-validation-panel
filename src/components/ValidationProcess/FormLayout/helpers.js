// eslint-disable-next-line import/prefer-default-export
export const formatDateIfDateField = (fieldName, fieldValue) => (fieldName.toLowerCase().includes('date')
  ? new Date(fieldValue).toLocaleDateString()
  : fieldValue);
