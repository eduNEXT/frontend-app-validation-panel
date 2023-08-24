import { Outlet } from 'react-router';

const PermissionsGuard = () => {
  /** Get roles through frontend-platform */
  const isValidatorOrCourseAuthor = true;
  return isValidatorOrCourseAuthor ? <Outlet /> : window.location.replace('http://studio.local.overhang.io:8001/home/');
};

export default PermissionsGuard;
