import UnAuthorized from '@/authentication/UnAuthorized';
import { useModulePermissionGate } from '@/hooks/useModulePermissionGate';
import { PRIVILEGEMODULE, PRIVILEGESCREEN } from '@/shared/enums/privilege';
import React from 'react';
interface Props {
  children: JSX.Element;
  screenName: PRIVILEGESCREEN;
  moduleName: PRIVILEGEMODULE | PRIVILEGESCREEN;
}
export default function PermissionGate(props: Props) {
  const permissions = useModulePermissionGate(props.screenName, props.moduleName);
  const assignedPermission = Object.values(permissions);
  if (!assignedPermission.some((element) => element === true)) {
    return <UnAuthorized />;
  }
  return props.children;
}
