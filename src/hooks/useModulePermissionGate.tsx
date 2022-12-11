import { PRIVILEGEMODULE, PRIVILEGES, PRIVILEGESCREEN } from '@/shared/enums/privilege';
import { usePermissions } from './application';
import { PermissionItem, PrivilegeItem } from '@/genericQueries/genericQueriesSchema';
import { SCREEN_CODE } from '@/routes/props';
export interface Permissions {
  create: boolean;
  update: boolean;
  delete: boolean;
  read: boolean;
  approve: boolean;
  configure: boolean;
  make_default: boolean;
}

export function useModulePermissionGate(
  screenName: PRIVILEGESCREEN,
  moduleName: PRIVILEGEMODULE | PRIVILEGESCREEN
): Permissions {
  const privilegeObj = {
    create: false,
    update: false,
    delete: false,
    read: false,
    approve: false,
    configure: false,
    make_default: false
  };
  const permissions = usePermissions();
  const moduleList = permissions ? null : null;
  if (moduleList) {
    if (moduleList[moduleName]) {
      //for making privileges dynamic
      privilegeObj.create = moduleList[moduleName]?.[PRIVILEGES.CREATE] ? true : false;
      privilegeObj.read = moduleList[moduleName]?.[PRIVILEGES.READ] ? true : false;
      privilegeObj.update = moduleList[moduleName]?.[PRIVILEGES.UPDATE] ? true : false;
      privilegeObj.delete = moduleList[moduleName]?.[PRIVILEGES.DELETE] ? true : false;
      privilegeObj.approve = moduleList[moduleName]?.[PRIVILEGES.APPROVE] ? true : false;
      privilegeObj.configure = moduleList[moduleName]?.[PRIVILEGES.CONFIGURE] ? true : false;
      privilegeObj.make_default = moduleList[moduleName]?.[PRIVILEGES.MAKE_DEFAULT] ? true : false;
    } else {
      return privilegeObj;
    }
  } else {
    return privilegeObj;
  }

  if (Object.values(privilegeObj).every((value) => value == false)) {
    return privilegeObj;
  }

  return privilegeObj;
}

export function usePermissionGate(screen_code: SCREEN_CODE): PrivilegeItem {
  const accessibleRoute: Array<PermissionItem> = [];

  const flatPermission = (route: PermissionItem) => {
    if (route.children.length > 0) {
      route.children.map((child) => flatPermission(child));
    } else {
      accessibleRoute.push(route);
    }
  };

  const permissions = usePermissions();

  permissions?.map((routeItem: PermissionItem) => {
    flatPermission(routeItem);
  });

  const mapped = accessibleRoute.find((route) => route.code === screen_code);
  console.log(mapped, 'mapped');

  const privilegeObj = {
    can_create: false,
    can_update: false,
    can_read: false,
    can_delete: false,
    can_approve: false,
    can_configure: false,
    can_transfer: false
  };
  if (mapped) {
    (privilegeObj.can_approve = mapped.privilege?.can_approve ? true : false),
      (privilegeObj.can_configure = mapped.privilege?.can_configure ? true : false),
      (privilegeObj.can_create = mapped.privilege?.can_create ? true : false),
      (privilegeObj.can_delete = mapped.privilege?.can_delete ? true : false),
      (privilegeObj.can_read = mapped.privilege?.can_read ? true : false),
      (privilegeObj.can_transfer = mapped.privilege?.can_transfer ? true : false),
      (privilegeObj.can_update = mapped.privilege?.can_update ? true : false);
  }

  return privilegeObj;
}
