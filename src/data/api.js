import {
  camelCaseObject,
  ensureConfig,
  getConfig,
  snakeCaseObject,
} from '@edx/frontend-platform';
import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { VALIDATION_API_PATH } from './constants';

ensureConfig(['LMS_BASE_URL'], 'Validation Panel API');

export const getApiBaseUrl = () => getConfig().LMS_BASE_URL;
export const getCoursesApiUrl = () => `${getApiBaseUrl()}/api/courses/v1/courses/`;
export const getValidationApiUrl = (service) => `http://localhost:3002/plugin-cvw/api/v1/${service}/`;

/**
 * Fetches all courses created by the current user (course author).
 * @returns {Promise<[{}]>}
 */

export async function getCoursesByUser() {
  const { data } = await getAuthenticatedHttpClient()
    .get(getCoursesApiUrl(), {
      params: {
        username: getAuthenticatedUser().username,
      },
    });
  return camelCaseObject(data);
}

/**
 * Fetches all the validation process created by the current user.
 * @returns {Promise<[{}]>}
 */

export async function getValidationProcessesByUser() {
  const { data } = await getAuthenticatedHttpClient()
    .get(getValidationApiUrl(VALIDATION_API_PATH.VALIDATION_PROCESS), {
      params: {
        username: getAuthenticatedUser().username,
      },
    });
  return camelCaseObject(data);
}

/**
 * Fetches all the records asocieted to a especific validation body.
 * @returns {Promise<[{}]>}
 */

export async function getValidationProcessesByValidationBody(validationBody) {
  const { data } = await getAuthenticatedHttpClient()
    .get(getValidationApiUrl(VALIDATION_API_PATH.VALIDATION_PROCESS), {
      params: {
        validation_body: validationBody,
      },
    });
  return camelCaseObject(data);
}

/**
 * Fetches validation body acording with the organization.
 * @param {string} org
 * @returns {Promise<[{}]>}
 */

export async function getValidationBody(org) {
  const { data } = await getAuthenticatedHttpClient()
    .get(getValidationApiUrl(VALIDATION_API_PATH.VALIDATION_BODY), {
      params: {
        org,
      },
    });
  return camelCaseObject(data);
}

/**
 * Fetches all the categories associated with the current course.
 *  @param {string} courseId
 * @returns {Promise<[{}]>}
 */

export async function getCourseCategories(courseId) {
  const { data } = await getAuthenticatedHttpClient()
    .get(getValidationApiUrl(VALIDATION_API_PATH.COURSE_CATEGORY), {
      params: {
        courseId,
      },
    });
  return camelCaseObject(data);
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
