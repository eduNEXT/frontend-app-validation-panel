/**
 * Defines the available fields and subfields for different roles (validator and courseAuthor).
 */
export const availableFields = {
  validator: {
    fields: ['courseName', 'courseId', 'categories', 'validationBody', 'organization', 'validationProcessEvents'],
    subfields: {
      validationProcessEvents: ['user', 'status', 'createdAt', 'comment'],
    },
  },
  courseAuthor: {
    fields: ['courseName', 'courseId', 'organization', 'validationBody', 'validationProcessEvents'],
    subfields: {
      validationProcessEvents: ['status', 'createdAt', 'reason', 'comment'],
    },
  },
};

/**
 * Filters the data based on the specified role (validator or courseAuthor).
 *
 * @param {Array} data - The input data to be filtered.
 * @param {string} role - The user's role ('validator' or 'courseAuthor').
 * @returns {Array} An array of filtered data.
 */
const filterFields = (data, role) => {
  const allowedFields = availableFields[role].fields;
  const allowedSubfields = availableFields[role].subfields.validationProcessEvents;

  return data.map((validationProcess) => {
    const fieldsForCurrentUser = {};

    // Iterate through the properties of the validation process
    Object.entries(validationProcess).forEach(([key, value]) => {
      if (allowedFields.includes(key)) {
        if (key === 'validationProcessEvents') {
          // For 'validationProcessEvents', filter subfields
          fieldsForCurrentUser[key] = value.map((event) => {
            const subfields = {};
            // Iterate through the subfields of each event
            Object.entries(event).forEach(([subKey, subValue]) => {
              if (allowedSubfields.includes(subKey)) {
                subfields[subKey] = subValue;
              }
            });
            return subfields;
          });
        } else {
          fieldsForCurrentUser[key] = value;
        }
      }
    });

    return fieldsForCurrentUser;
  });
};

/**
 * Get permission-based data for a user.
 *
 * @param {Array} data - The input data containing validation processes.
 * @param {boolean} isValidator - Indicates whether the user is a validator or course author.
 * @returns {Array} An array of filtered data based on the user's role.
 */
export const getPermissionBasedData = (data, isValidator) => {
  // Determine the user's role
  const role = isValidator ? 'validator' : 'courseAuthor';
  // Filter the data based on the role
  return filterFields(data, role);
};
