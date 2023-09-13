import {
  camelCaseObject, ensureConfig, getConfig, snakeCaseObject,
} from '@edx/frontend-platform';
import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { VALIDATION_API_PATH } from './constants';
import mockedValidationProcesses from './mocked_data';

ensureConfig(['LMS_BASE_URL', 'STUDIO_BASE_URL'], 'Validation Panel API');

export const getApiLmsBaseUrl = () => getConfig().LMS_BASE_URL;
export const getApiStudioBaseUrl = () => getConfig().STUDIO_BASE_URL;
export const getCoursesApiUrl = () => `${getApiLmsBaseUrl()}/api/courses/v1/courses/`;
export const getValidationApiUrl = (service) => `${getApiStudioBaseUrl()}/plugin-cvw/api/v1/${service}/`;

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

// TODO: Allow receiving params when is connected to the API
// export async function getValidationProcesses(params) {
export async function getValidationProcesses() {
  // TODO: Allow accessing the API fot getting this information
  const data = { results: mockedValidationProcesses };
  // const { data } = await getAuthenticatedHttpClient()
  //   .get(getValidationApiUrl(VALIDATION_API_PATH.VALIDATION_PROCESS), {
  //     params,
  //   });
  return camelCaseObject(data);
}

/**
 * Fetches validation body acording with the organization.
 * @param {string} org
 * @returns {Promise<[{}]>}
 */

// TODO: Allow receiving org id when is connected to the API
// export async function getValidationBody(org) {
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
 * Fetches all available categories to associate with course validation processes
 * @returns {Promise<[{}]>}
 */

export async function getAvailableCategories() {
  const { data } = await getAuthenticatedHttpClient()
    .get(getValidationApiUrl(VALIDATION_API_PATH.CATEGORIES));
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
