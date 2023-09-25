export const formatDateIfDateField = (fieldName, fieldValue) => (fieldName.toLowerCase().includes('date') ? new Date(fieldValue).toLocaleDateString('en-GB') : fieldValue);

export const getFormValues = (data, isValidator) => {
  const values = {};

  if (isValidator) {
    return {
      reviewStartDate: new Date().toISOString(),
      status: '',
      reason: '',
      comment: '',
    };
  }

  data?.forEach((property) => {
    values[property.name] = property.value;
  });

  return values;
};

export const exemptedFields = ['validationBody', 'reviewer', 'submissionComments'];

export const sortByPositionProp = (a, b) => {
  if (a.pos < b.pos) {
    return -1;
  }
  if (a.pos > b.pos) {
    return 1;
  }
  return 0;
};
