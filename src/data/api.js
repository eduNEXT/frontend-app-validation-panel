import {
  camelCaseObject, ensureConfig, getConfig, snakeCaseObject,
} from '@edx/frontend-platform';
import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { VALIDATION_API_PATH } from './constants';

ensureConfig(['LMS_BASE_URL'], 'Validation Panel API');

export const getApiBaseUrl = () => getConfig().LMS_BASE_URL;
export const getCoursesApiUrl = () => `${getApiBaseUrl()}/api/courses/v1/courses/`;
export const getValidationApiUrl = (service) => `${getApiBaseUrl()}/plugin-cvw/api/v1/${service}/`;

/**
 * Fetches all courses created by the current user (course author).
 * @returns {Promise<[{}]>}
 */

export async function getCoursesByUser() {
  try {
    const { data } = await getAuthenticatedHttpClient().get(getCoursesApiUrl(), {
      params: {
        username: getAuthenticatedUser().username,
      },
    });
    return camelCaseObject(data);
  } catch (error) {
    console.error('Custom Attributes', error.customAttributes);
    throw error;
  }
}

/**
 * Fetches all the validation records created by the current user or related to a validation body.
 *  * @param {object} params
 * @returns {Promise<[{}]>}
 */

export async function getValidationProcesses(params) {
  const { data } = await getAuthenticatedHttpClient()
    .get(getValidationApiUrl(VALIDATION_API_PATH.VALIDATION_PROCESS), {
      params,
    });
  return camelCaseObject(data);
}

/**
 * Fetches validation body acording with the organization.
 * @param {string} org
 * @returns {Promise<[{}]>}
 */

// TODO: Allow receiving org id when is connected to the API
// export async function getValidationBody(org) {
export async function getValidationBody() {
  try {
    // TODO: Allow accessing the API fot getting this information
    const data = {
      results: [
        { name: 'Validator body 1' },
        { name: 'Validator body 2' },
      ],
    };
    // const { data } = await getAuthenticatedHttpClient()
    //  .get(getValidationApiUrl(VALIDATION_API_PATH.VALIDATION_BODY), {
    //    params: {
    //      org,
    //    },
    //  });
    return camelCaseObject(data);
  } catch (error) {
    console.error('Custom Attributes', error.customAttributes);
    throw error;
  }
}

/**
 * Fetches all available categories to associate with course validation processes
 * @returns {Promise<[{}]>}
 */

export async function getAvailableCategories() {
  try {
    // TODO: Allow accessing the API fot getting this information
    const data = {
      results: [
        { name: 'Category 1' },
        { name: 'Category 2' },
        { name: 'Category 3' },
        { name: 'Category 4' },
      ],
    };
    // const { data } = await getAuthenticatedHttpClient()
    //   .get(getValidationApiUrl(VALIDATION_API_PATH.COURSE_CATEGORY));
    return camelCaseObject(data);
  } catch (error) {
    console.error('Custom Attributes', error.customAttributes);
    throw error;
  }
}

/**
 * Fetches all the categories associated with the current course.
 *  @param {string} courseId
 * @returns {Promise<[{}]>}
 */

export async function getCourseCategories(courseId) {
  try {
    const { data } = await getAuthenticatedHttpClient()
      .get(getValidationApiUrl(VALIDATION_API_PATH.COURSE_CATEGORY), {
        params: {
          courseId,
        },
      });
    return camelCaseObject(data);
  } catch (error) {
    console.error('Custom Attributes', error.customAttributes);
    throw error;
  }
}

/**
 * Creates a new validation process for the course
 *  @param {object} config
      * courseId: { string }
      * organization: { string }
      * categories: { array<string> },
      * validationBody: { string }
 *  */
export async function postValidationProcess(config) {
  const { data } = await getAuthenticatedHttpClient().post(
    getValidationApiUrl(VALIDATION_API_PATH.VALIDATION_PROCESS),
    snakeCaseObject(config),
  );
  return camelCaseObject(data);
}

/**
 * Creates a new validation process event
 *  @param {object} config
     * status: { string }
     * reason: { string | null }
     * comment: { string }
     * user { string }
* */
export async function postValidationProcessEvent(config) {
  const { data } = await getAuthenticatedHttpClient().post(
    getValidationApiUrl(VALIDATION_API_PATH.VALIDATION_EVENT),
    snakeCaseObject(config),
  );
  return data;
}
