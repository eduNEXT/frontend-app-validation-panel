import { Outlet } from 'react-router';
import { getConfig } from '@edx/frontend-platform';

const PermissionsGuard = () => {
  /** Get roles through frontend-platform */
  const isValidatorOrCourseAuthor = true;
  return isValidatorOrCourseAuthor ? <Outlet /> : window.location.replace(getConfig().STUDIO_BASE_URL);
};

export default PermissionsGuard;
