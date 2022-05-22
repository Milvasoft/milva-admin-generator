import { Permissions } from '@assets/enums/Permissions';
import { getAppState } from '@utils/store';

export default function checkAuthority(permissions: Permissions) {

  const roles = getAppState().appReducer.user?.roles;

  if (roles?.includes(Permissions.SuperUser)) return true;
  return !!roles?.includes(permissions);

}
