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
  const { data } = await getAuthenticatedHttpClient().get(getCoursesApiUrl(), {
    params: {
      username: getAuthenticatedUser().username,
    },
  });
  return camelCaseObject(data);
}

/**
 * Fetches all the validation records created by the current user or related to a validation body.
 *  * @param {object} params
 * @returns {Promise<[{}]>}
 */

/**
 * Fetches a specific validation process by course id.
 *  * @param {string} courseId
 * @returns {Promise<[{}]>}
 */

export async function getAllValidationProcesses() {
  const { data } = await getAuthenticatedHttpClient().get(getValidationApiUrl(VALIDATION_API_PATH.VALIDATION_PROCESS));
  return camelCaseObject(data);
}

export async function getValidationProcess(courseId) {
  const { data } = await getAuthenticatedHttpClient().get(
    getValidationApiUrl(`${VALIDATION_API_PATH.VALIDATION_PROCESS}/${courseId}`),
  );
  return camelCaseObject(data);
}

/**
 * Fetches validation body acording with the organization.
 * @param {string} org
 * @returns {Promise<[{}]>}
 */

// TODO: Allow receiving org id when is connected to the API
// export async function getValidationBodies(org) {
export async function getValidationBodies(org) {
  const { data } = await getAuthenticatedHttpClient().get(getValidationApiUrl(VALIDATION_API_PATH.VALIDATION_BODY), {
    params: {
      org,
    },
  });
  return camelCaseObject(data);
}

/**
 * Fetches all available categories to associate with course validation processes
 * @returns {Promise<[{}]>}
 */

export async function getCategories() {
  const { data } = await getAuthenticatedHttpClient().get(getValidationApiUrl(VALIDATION_API_PATH.CATEGORIES));
  return camelCaseObject(data);
}

/**
 * Creates a new validation process for the course
 *  @param {object} config
  * @param { string } config.courseId
  * @param { number } config.validationBodyId
  * @param { string } config.comment
  * @param { array<number> } config.categoryIds
 *  */
export async function postValidationProcess(config) {
  const { data } = await getAuthenticatedHttpClient().post(
    getValidationApiUrl(`${VALIDATION_API_PATH.VALIDATION_PROCESS}/${config.courseId}/submit`),
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
